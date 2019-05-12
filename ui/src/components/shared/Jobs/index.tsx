import React from "react";

// Reducer that saves state of jobs output

enum ACTION_TYPES {
    ADD_JOB,
    UPDATE_OUTPUT,
    CLEAR_OUTPUT,
}

/* 
  each job in state is
  "job-id": {
    "stdout": "",
  }

*/
export const initialState = {};

export const jobsReducer = (state = initialState, action: IJobAction) => {
    switch (action.type) {
        case ACTION_TYPES.ADD_JOB: {
            const room = action.room;

            if (!state.hasOwnProperty(room)) {
                return {
                    ...state,
                    [room]: {
                        stdout: "",
                    },
                };
            }

            return state;
        }
        case ACTION_TYPES.UPDATE_OUTPUT: {
            const room = action.room;
            console.log(`Current Data: `, state[room].stdout);

            const data = action.data;
            console.log(`Incoming Data: `, data);

            return {
                ...state,
                [room]: {
                    stdout: state[room].stdout + data,
                },
            };
        }
        case ACTION_TYPES.CLEAR_OUTPUT: {
            const room = action.room;
            return {
                ...state,
                [room]: {
                    stdout: "",
                },
            };
        }
        default:
            return state;
    }
};

interface IJobsContextValue {
    state: object;
    dispatch: React.Dispatch<IJobAction>;
}

interface IJobsProviderProps {
    value?: IJobsContextValue;
    children: React.ReactNode;
}

export const JobsContext = React.createContext<IJobsContextValue | undefined>(undefined);

function JobsProvider(props: IJobsProviderProps) {
    const [state, dispatch] = React.useReducer(jobsReducer, initialState);
    const value = React.useMemo(() => {
        return {
            state,
            dispatch,
        };
    }, [state, dispatch]);
    return <JobsContext.Provider value={value} {...props} />;
}

function useJobs() {
    const context = React.useContext(JobsContext);
    if (!context) {
        throw new Error("useJobs must be used within a JobsProvider");
    }
    return { ...context, ACTION_TYPES };
}

export { JobsProvider, useJobs };
