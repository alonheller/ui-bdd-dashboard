For /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set mydate=%%c-%%a-%%b)
For /f "tokens=1-2 delims=/:" %%a in ("%TIME%") do (set mytime=%%a%%b)
echo %mydate%_%mytime%

if exist new.xml (
  copy 5.xml .\old\bdd_archive_%mydate%_%mytime%.xml
  copy 4.xml 5.xml
	copy 3.xml 4.xml
	copy 2.xml 3.xml
	copy 1.xml 2.xml
	copy new.xml 1.xml
	del new.xml
)
