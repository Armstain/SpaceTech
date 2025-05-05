import Link from 'next/link';

export default function GetApiKeyInstructions() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-xl font-bold mb-4">How to Get a Publishable API Key</h2>
      <ol className="list-decimal pl-6 space-y-3">
        <li>Log in to your Medusa Admin dashboard at <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:9000/app</code></li>
        <li>Go to Settings (gear icon in the sidebar)</li>
        <li>Select "API Keys" from the left menu</li>
        <li>Click on the "Create API Key" button</li>
        <li>Select "Publishable API Key" as the key type</li>
        <li>Give it a name like "Storefront"</li>
        <li>Click "Create and reveal"</li>
        <li>Copy the generated key - it starts with "pk_"</li>
        <li>Open your project's <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code> file</li>
        <li>Update the line <code className="bg-gray-100 px-2 py-1 rounded">NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_your_publishable_key_here</code> with your actual key</li>
        <li>Save the file and restart your development server</li>
      </ol>
      <div className="mt-6">
        <Link href="/debug" className="text-primary hover:underline">
          Return to Debug Page
        </Link>
      </div>
    </div>
  );
} 