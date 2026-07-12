# Notes Application


Currently this is a basic application with just a post and get method for notes. 

Previously, It was like 

```
/notes
--page.tsx: containing forms for writing and a button for accessing all notes
-- /written
--|--page.tsx: containing all notes 
```

Now it is like after  84c51f9
- /notes shows all notes as previously but with common navbar
- /notes/write containing form to write, navbar with submit and removed bottom submit and warnings
- navbar changed to navbar with props
