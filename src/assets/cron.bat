if exist new.xml (
  copy 4.xml 5.xml
	copy 3.xml 4.xml
	copy 2.xml 3.xml
	copy 1.xml 2.xml
	copy new.xml 1.xml
	del new.xml
)
