echo ��ʼ���ǰ��...

call npm run build

echo ���ǰ�˴������ʼ���Ƶ�Web��...

set currentDir=%cd%
set webProjectDir="D:\jbi-web\jbi-starter\src\main\resources"
set sourceDir="%currentDir%\dist"

set targetWebStaticDir="%webProjectDir%\static"
set targetWebTemplatesDir="%webProjectDir%\templates"



rd /s/q %targetWebStaticDir%\css
rd /s/q %targetWebStaticDir%\fonts
rd /s/q %targetWebStaticDir%\img
rd /s/q %targetWebStaticDir%\js

md %targetWebStaticDir%\css
md %targetWebStaticDir%\fonts
md %targetWebStaticDir%\img
md %targetWebStaticDir%\js


xcopy /y /c %sourceDir%\css %targetWebStaticDir%\css
xcopy /y /c %sourceDir%\fonts %targetWebStaticDir%\fonts
xcopy /y /c %sourceDir%\img %targetWebStaticDir%\img
xcopy /y /c %sourceDir%\js %targetWebStaticDir%\js
copy %sourceDir%\index.html %targetWebTemplatesDir%\index.html

echo ִ�����

pause