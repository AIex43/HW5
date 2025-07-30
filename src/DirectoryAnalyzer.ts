import * as fs from 'fs';
import * as path from 'path';
import { DirectoryReport } from './DirectoryReport';

export class DirectoryAnalyzer {
    analyze(dirPath: string): DirectoryReport {
        const report: DirectoryReport = {
            files: 0,
            directories: 0,
            totalSize: 0,
            extensions: {}
        };
        this._walk(dirPath, report);
        return report;
    }

    private _walk(currentPath: string, report: DirectoryReport) {
        const entries = fs.readdirSync(currentPath, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(currentPath, entry.name);
            if (entry.isDirectory()) {
                report.directories++;
                this._walk(fullPath, report);
            } else if (entry.isFile()) {
                report.files++;
                const stats = fs.statSync(fullPath);
                report.totalSize += stats.size;
                const ext = path.extname(entry.name) || 'no_ext';
                report.extensions[ext] = (report.extensions[ext] || 0) + 1;
            }
        }
    }
}