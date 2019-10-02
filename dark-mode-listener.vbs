Const HKEY_USERS = &H80000003

Set WMIService = GetObject("winmgmts:\\.\root\default")
Set WMIRegistry = GetObject("winmgmts:{impersonationLevel=impersonate}!\\.\root\default:StdRegProv")

Function GetSIDFromUser(UserName)
  Dim DomainName, Result, WMIUser

  If InStr(UserName, "\") > 0 Then
    DomainName = Mid(UserName, 1, InStr(UserName, "\") - 1)
    UserName = Mid(UserName, InStr(UserName, "\") + 1)
  Else
    DomainName = CreateObject("WScript.Network").UserDomain
  End If

  Set WMIUser = GetObject("winmgmts:{impersonationlevel=impersonate}!" _
    & "/root/cimv2:Win32_UserAccount.Domain='" & DomainName & "'" _
    & ",Name='" & UserName & "'")

  GetSIDFromUser = WMIUser.SID
End Function

Function PrintCurrentMode(Path)
  Dim Value

  WMIRegistry.GetDWORDValue HKEY_USERS, Path, "AppsUseLightTheme", Value

  If IsNull(Value) = True Or Value <> 0 Then
    wscript.echo "light"
  Else
    wscript.echo "dark"
  End If
End Function

SID = GetSIDFromUser(CreateObject("WScript.Network").UserName)
Path = SID & "\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize"

PrintCurrentMode(Path)

Set Events = WMIService.ExecNotificationQuery("SELECT * FROM RegistryKeyChangeEvent WHERE Hive='HKEY_USERS' AND KeyPath='" & Path & "'")
Do
  Set LatestEvent = Events.NextEvent
  PrintCurrentMode(Path)
Loop
