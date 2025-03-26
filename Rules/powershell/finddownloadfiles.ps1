# Define the path to search
$searchPath = "C:\Users\jwpmi\Downloads"

# Define search terms that indicate suggestion-related content
$searchTerms = @(
    "suggestion"
)

Write-Host "Searching for suggestion-related markdown documents in $searchPath..." -ForegroundColor Cyan

# Find all markdown files in the Downloads folder and subfolders, excluding specific folders
$markdownFiles = Get-ChildItem -Path $searchPath -Recurse -Include *.md -ErrorAction SilentlyContinue |
    Where-Object { 
        $_.FullName -notmatch '\\node_modules\\' -and
        $_.FullName -notmatch '\\Python\\' -and
        $_.FullName -notmatch '\\VSCode\\'
    }

Write-Host "Found $($markdownFiles.Count) markdown files after excluding node_modules, Python, and VSCode folders." -ForegroundColor Yellow

$suggestionDocs = @()

# Check each file for suggestion-related content or matching file name
foreach ($file in $markdownFiles) {
    try {
        $content = Get-Content -Path $file.FullName -Raw -ErrorAction SilentlyContinue
        
        # Check if file contains any of the search terms in content
        $isMatchInContent = $false
        $preview = ""
        foreach ($term in $searchTerms) {
            if ($content -match $term) {
                $isMatchInContent = $true
                # Extract a preview of the content
                $preview = $content.Substring(0, [Math]::Min(100, $content.Length)) + "..."
                break
            }
        }

        # Check if the file name contains only the search terms
        $fileNameWithoutExtension = [System.IO.Path]::GetFileNameWithoutExtension($file.Name).ToLower()
        $isMatchInFileName = $searchTerms -contains $fileNameWithoutExtension

        # Include the file if it matches either condition
        if ($isMatchInContent -or $isMatchInFileName) {
            $suggestionDocs += [PSCustomObject]@{
                FullName = $file.FullName
                LastWriteTime = $file.LastWriteTime
                Length = $file.Length
                MatchType = if ($isMatchInContent) { "Matched in content" } else { "Matched in file name" }
                Preview = if ($isMatchInContent) { $preview } else { "N/A" }
            }
        }
    }
    catch {
        Write-Host "Error reading file $($file.FullName): $_" -ForegroundColor Red
    }
}

# Output results
Write-Host "`nFound $($suggestionDocs.Count) suggestion-related markdown documents:" -ForegroundColor Green

foreach ($doc in $suggestionDocs) {
    # Create clickable link for VS Code terminal
    $filePath = $doc.FullName
    Write-Host "  • [$($doc.FullName)](file:///$filePath)" -ForegroundColor Cyan
    Write-Host "    Match Type: $($doc.MatchType)" -ForegroundColor White
    if ($doc.Preview -ne "N/A") {
        Write-Host "    Preview: $($doc.Preview)" -ForegroundColor Gray
    }
    Write-Host ""
}

# Export to CSV with additional details
$suggestionDocs | Export-Csv -Path "$searchPath\SuggestionDocuments.csv" -NoTypeInformation

Write-Host "`nResults exported to $searchPath\SuggestionDocuments.csv" -ForegroundColor Cyan