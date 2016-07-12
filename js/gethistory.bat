@echo off
powershell -noexit "ipconfig /displaydns | select-string 'Record Name' | foreach-object { $_.ToString().split(' ')[-1]} | sort | Out-Gridview"