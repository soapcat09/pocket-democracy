import { getAllDemoCodes } from "@/lib/demoCodes";
import { romanianTowns } from "@/lib/towns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

export default function DemoCodesPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const demoCodes = getAllDemoCodes();
  const townMap = Object.fromEntries(romanianTowns.map(t => [t.code, t.name]));

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Demo Codes - Romanian Cities</CardTitle>
            <CardDescription>
              Use these codes to test the city selection feature. Each city has a unique demo code.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {demoCodes.map((item) => {
                const townName = townMap[item.city] || item.city;
                return (
                  <div
                    key={item.city}
                    className="flex items-center justify-between gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-gray-900">{townName}</p>
                      <p className="text-xs text-gray-500">{item.city}</p>
                      <p className="font-mono font-bold text-indigo-600 mt-1">{item.code}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(item.code)}
                      className="p-2 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
                      title="Copy code"
                    >
                      {copiedCode === item.code ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">How to use:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
                <li>Copy a demo code for the city you want to test</li>
                <li>Go to the city selection page</li>
                <li>Paste the code to select that city</li>
                <li>The app will load that city's initiatives</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
