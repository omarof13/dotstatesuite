
1- override the following files (with the files in the folder)
/home/dotstatuser/dotstatesuite/demo/config/configs/tenants.json
/home/dotstatuser/dotstatesuite/demo/config/configs/demo/data-explorer/settings.json

DLM (http://localhost:7000)
1- Create Organisation scheme Agency Statistique canada
1.1- use OrganisationSchemes.xml in DLM to create it

2- Create the following Code listes (CL_REF_AREA, CL_SEX)
2.1 use CL_REF_AREA.xml, CL_SEX.xml in DLM to create it


3- Create a Concept sheme  CS_Population
3.1 use ConceptScheme.xml in DLM to create it


4- Create a data structure definition DSD
4.1 use DSD_POP.xml in DLM to create it

5- Create the following hierachy geography list (HCL_REF_AREA)
5.1 use HCL_REF_AREA.xml in DLM to create it

6- Create first data flow (DF_POP) and link it to to DSD_POP
6.1 use DF_POP_With_Annotation.xml in DLM to create it

7- Create Category Scheme CS_TOPICS_HIERARCHY
7.1 use CategoryScheme-CS_POP_HIERARCHY.xml in DLM to create it
7.2 sfs container might need to be restarted! 


8 - Upload data & referential metadata (load data)
8.1 - select POP_DATA.xml

9- categorize the DF_POP dataflow
9.1 select the menu at the right of the dataflow and select categorize structure
9.2 Select (POP_SEX_YEAR leaf)
9.3 If the category scheme created in step 6 doesnt appear, maybe restart sfs container and DLM


10- (Re-)index dataflow
10.1 select the menu at the right of the dataflow and select (Re-)index dataflow
10.1.1 (if indexation doesnt work, EX: no category scheme found) a restart of a suite could help!

11- Check the data in the data explorer (http://localhost:7001)


