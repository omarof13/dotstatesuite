
1- override the following files (with the files in the folder)
/home/dotstatuser/dotstatesuite/demo/config/configs/tenants.json
/home/dotstatuser/dotstatesuite/demo/config/configs/demo/data-explorer/settings.json

DLM (http://localhost:7000)
1- Create Organisation scheme Agency Statistique canada
1.1- use OrganisationSchemes.xml in DLM to create it

2- Create the following Code listes (CL_REF_AREA, CL_SEX)
2.1 use Codelists.xml in DLM to create it


3- Create a Concept sheme  CS_Population
3.1 use ConceptScheme.xml in DLM to create it


4- Create a data structure definition DSD
4.1 use DSD_POP.xml in DLM to create it

5- Create first data flow (DF_POP) and link it to to DSD_POP
5.1 use DF_POP.xml in DLM to create it

6- Create Category Scheme CS_TOPICS_HIERARCHY
6.1 use CategoryScheme-CS_POP_HIERARCHY.xml in DLM to create it
6.2 sfs container "needs" to be restarted! 


7 - Upload data & referential metadata (load data)
7.1 -  Add files and select POP_DATA.xml

8- categorize the DF_POP dataflow
8.1 select the menu at the right of the dataflow and select categorize structure
8.2 Select (POP_SEX_YEAR)

9- (Re-)index dataflow
9.1 select the menu at the right of the dataflow and select (Re-)index dataflow
9.1.1 (if indexation doesnt work, EX: no category scheme found) a restart of a suite could help!

10- Check the data in the data explorer (http://localhost:7001)

5- Create second data flow (DF_POP1) and link it to to DSD_POP
5.1 use DF_POP1_WithConstraint.xml in DLM to create it
5.2 categorize the DF_POP1 dataflow
5.3 select the menu at the right of the dataflow and select categorize structure
5.4 Select (POP_SEX_YEAR)

