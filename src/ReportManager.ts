import { ReportAdapter } from './ReportAdapter';
import { JsonReportAdapter } from './JsonReportAdapter';
import { CsvReportAdapter } from './CsvReportAdapter';
import { XmlReportAdapter } from './XmlReportAdapter';
import { AnalyzerFacade } from './AnalyzerFacade';
import * as fs from 'fs';
import * as path from 'path';

export class ReportManager {
    private format: string;

    constructor(format: string) {
        this.format = format.toLowerCase();
    }

    generateReport(targetPath: string): void {
        try {
            let adapter: ReportAdapter;
            switch (this.format) {
                case 'csv':
                    adapter = new CsvReportAdapter();
                    break;
                case 'xml':
                    adapter = new XmlReportAdapter();
                    break;
                case 'json':
                default:
                    adapter = new JsonReportAdapter();
            }
            const facade = new AnalyzerFacade(adapter);
            const output = facade.generateReport(targetPath);

            const reportsDir = path.resolve('reports');
            if (!fs.existsSync(reportsDir)) {
                fs.mkdirSync(reportsDir);
            }

            const timestamp = new Date().toISOString().replace(/:/g, '-');
            const filename = `report-${timestamp}.${this.format}`;
            const filePath = path.join(reportsDir, filename);
            fs.writeFileSync(filePath, output, 'utf-8');

            console.log(`Report generated successfully: ${filePath}`);
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error generating report:', error.message);
            } else {
                console.error('Error generating report:', error);
            }
        }
    }
}