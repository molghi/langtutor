function exportWords(data: any) {
    const now = new Date();
    const date = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const filename = `langtutor-export--${date}-${month}-${year.toString().slice(2)}--${hours}-${minutes
        .toString()
        .padStart(2, "0")}.json`;

    // Convert data to JSON: Converts the JavaScript object 'data' into a formatted JSON string. The 'null, 2' arguments ensure the output is pretty-printed with 2-space indentation for readability.
    const json = JSON.stringify(data, null, 2);

    // Create a blob: Creates a binary large object (Blob) containing the JSON string, specifying the MIME type as 'application/json' to ensure it's recognised as a JSON file.
    const blob = new Blob([json], { type: "application/json" });

    // Create a download URL: Generates a temporary URL pointing to the Blob, enabling it to be downloaded as a file by associating it with a download link.
    const url = URL.createObjectURL(blob);

    // Create an invisible anchor element for downloading
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;

    // Click programmatically and remove it right after
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the URL
    URL.revokeObjectURL(url);
}

export default exportWords;
