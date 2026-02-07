import * as vscode from 'vscode';
import { Detector } from '@safetype/core';

export function activate(context: vscode.ExtensionContext) {
    console.log('SafeType extension is now active!');

    const diagnosticCollection = vscode.languages.createDiagnosticCollection('safetype');
    context.subscriptions.push(diagnosticCollection);

    const detector = new Detector();

    function updateDiagnostics(document: vscode.TextDocument) {
        if (document.isUntitled) {
            // Optional: Decide if we scan unsaved files. Usually yes.
        }

        // Don't scan git diffs or internal files if possible
        if (document.uri.scheme === 'git' || document.uri.scheme === 'output') {
            return;
        }

        console.log(`Scanning document: ${document.fileName}`);

        const text = document.getText();
        const results = detector.scan(text);
        const diagnostics: vscode.Diagnostic[] = [];

        for (const result of results) {
            const startPos = document.positionAt(result.startIndex);
            const endPos = document.positionAt(result.endIndex);
            const range = new vscode.Range(startPos, endPos);

            const diagnostic = new vscode.Diagnostic(
                range,
                `[SafeType] ${result.message} (${result.type})`,
                vscode.DiagnosticSeverity.Warning
            );

            // Add source and code
            diagnostic.source = 'SafeType';
            diagnostic.code = result.type;
            diagnostics.push(diagnostic);
        }

        diagnosticCollection.set(document.uri, diagnostics);
    }


    // Scan active editor on activation
    if (vscode.window.activeTextEditor) {
        updateDiagnostics(vscode.window.activeTextEditor.document);
    }

    // Listen for changes
    context.subscriptions.push(
        vscode.workspace.onDidChangeTextDocument((e) => {
            updateDiagnostics(e.document);
        }),
        vscode.window.onDidChangeActiveTextEditor((editor) => {
            if (editor) {
                updateDiagnostics(editor.document);
            }
        })
    );
}

export function deactivate() { }
