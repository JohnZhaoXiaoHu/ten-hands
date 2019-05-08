import { Divider, Tab, Tabs } from "@blueprintjs/core";
import React from "react";
import { useProjects } from "../shared/Projects";

const ProjectsList = React.memo(() => {
    const { projects, setActiveProject } = useProjects();
    const changeActiveProject = projectId => {
        const activeProjectWithId = projects.find(project => project._id === projectId);
        if (activeProjectWithId) {
            setActiveProject(activeProjectWithId);
        }
    };
    if (projects.length === 0) {
        return <div />;
    }
    return (
        <Tabs
            vertical={true}
            className={`w-100`}
            large={true}
            onChange={changeActiveProject}
            defaultSelectedTabId={projects[0]._id}
        >
            {/* <InputGroup className={Classes.FILL} type="text" placeholder="Search..." /> */}
            <Divider />
            {projects.map(project => (
                <Tab key={project._id} id={project._id} title={project.name} />
            ))}
        </Tabs>
    );
});

export default ProjectsList;
