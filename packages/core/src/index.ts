export type DetectionType =
    | "EMAIL"
    | "API_KEY"
    | "PASSWORD"
    | "PRIVATE_KEY"
    | "JWT"
    | "CREDIT_CARD"
    | "PHONE_NUMBER"
    | "UNKNOWN";

export interface DetectionResult {
    type: DetectionType;
    confidence: number;
    message: string;
    match: string;
    startIndex: number;
    endIndex: number;
    context?: string;
}

interface Rule {
    id: string;
    type: DetectionType;
    pattern: RegExp;
    confidence: number;
    message: string;
    keywords?: string[]; // Context keywords to boost confidence
}

const RULES: Rule[] = [
    {
        id: "email",
        type: "EMAIL",
        pattern: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/gi,
        confidence: 0.6,
        message: "Possible email address found.",
        keywords: ["email", "contact", "mail"],
    },
    {
        id: "openai-api-key",
        type: "API_KEY",
        pattern: /sk-[a-zA-Z0-9]{32,}/g,
        confidence: 0.95,
        message: "OpenAI API Key detected. Ensure this is not committed.",
        keywords: ["api", "key", "secret", "token", "openai"],
    },
    {
        id: "aws-access-key",
        type: "API_KEY",
        pattern: /AKIA[0-9A-Z]{16}/g,
        confidence: 0.95,
        message: "AWS Access Key ID detected.",
        keywords: ["aws", "access", "key", "id"],
    },
    {
        id: "jwt-token",
        type: "JWT",
        pattern: /eyJ[a-zA-Z0-9_-]+\.eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+/g,
        confidence: 0.8,
        message: "Potential JWT Token detected.",
        keywords: ["token", "auth", "authorization", "bearer"],
    },
    {
        id: "private-key",
        type: "PRIVATE_KEY",
        pattern: /-----BEGIN PRIVATE KEY-----/g,
        confidence: 1.0,
        message: "Private Key detected. CRITICAL SECURITY RISK.",
    }
];

export class Detector {
    private rules: Rule[];

    constructor() {
        this.rules = RULES;
    }

    public scan(text: string): DetectionResult[] {
        const results: DetectionResult[] = [];

        for (const rule of this.rules) {
            // Reset lastIndex for global regex
            rule.pattern.lastIndex = 0;

            let match;
            while ((match = rule.pattern.exec(text)) !== null) {
                const matchedText = match[0];
                const startIndex = match.index;
                const endIndex = startIndex + matchedText.length;

                // Context check (simple naive implementation)
                const contextStart = Math.max(0, startIndex - 50);
                const contextEnd = Math.min(text.length, endIndex + 50);
                const context = text.slice(contextStart, contextEnd);

                let confidence = rule.confidence;

                // Boost confidence if keywords exist in context
                if (rule.keywords) {
                    const contextLower = context.toLowerCase();
                    const hasKeyword = rule.keywords.some(k => contextLower.includes(k.toLowerCase()));
                    if (hasKeyword) {
                        confidence = Math.min(1.0, confidence + 0.2);
                    }
                }

                // Boost if near assignment operators
                if (/[=:]\s*$/.test(text.slice(Math.max(0, startIndex - 10), startIndex))) {
                    confidence = Math.min(1.0, confidence + 0.1);
                }


                results.push({
                    type: rule.type,
                    confidence, // Should ideally round or limit precision
                    message: rule.message,
                    match: matchedText,
                    startIndex,
                    endIndex,
                    context: context, // Or a snippet
                });
            }
        }

        // Sort by index
        return results.sort((a, b) => a.startIndex - b.startIndex);
    }
}
