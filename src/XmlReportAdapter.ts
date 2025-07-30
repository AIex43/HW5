import { ReportAdapter } from './ReportAdapter';
import { DirectoryReport } from './DirectoryReport';

export class XmlReportAdapter implements ReportAdapter {
    export(report: DirectoryReport): string {
        const parts: string[] = [];
        parts.push('<?xml version="1.0" encoding="UTF-8"?>');
        parts.push('<report>');
        parts.push(`  <files>${report.files}</files>`);
        parts.push(`  <directories>${report.directories}</directories>`);
        parts.push(`  <totalSize>${report.totalSize}</totalSize>`);
        parts.push('  <extensions>');
        for (const [ext, count] of Object.entries(report.extensions)) {
            parts.push(`    <extension name="${ext}" count="${count}"/>`);
        }
        parts.push('  </extensions>');
        parts.push('</report>');
        return parts.join('\n');
    }
}