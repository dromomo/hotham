${env:RUST_BACKTRACE} = 1
adb shell am force-stop rust.hotham_smoked_meats

cargo apk run --release --bins

if ($?) {
    Start-Sleep -Seconds 2
    $processIdStr = (adb shell pidof rust.smoked_meats) | Out-String
    Write-Output $processIdStr
    $processId = $processIdStr -as [int]
    Write-Output $processId
    adb logcat --pid=$processId
}