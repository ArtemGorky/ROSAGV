export const robotsTasksMockData = [
    {
        "booking": {
            "id": "47e460ed-eed0-4f52-bc78-15888798583b",
            "unix_millis_earliest_start_time": 7334190,
            "unix_millis_request_time": null,
            "priority": null,
            "labels": null,
            "requester": "requester_1"
        },
        "category": null,
        "detail": "",
        "unix_millis_start_time": 7335140,
        "unix_millis_finish_time": 7415930,
        "original_estimate_millis": 0,
        "estimate_millis": 0,
        "assigned_to": {
            "group": "tinyRobot",
            "name": "tinyRobot1"
        },
        "status": "completed",
        "dispatch": {
            "errors": [
                {
                    "code": 0,
                    "category": "string",
                    "detail": "string"
                },
                {
                    "code": null,
                    "category": "string",
                    "detail": "string"
                },
                {
                    "code": 2,
                    "category": null,
                    "detail": "string"
                },
            ]
        },
        "phases": {
            "1": {
                "id": 1,
                "category": "Sequence",
                "detail": "[{\"category\":\"Go to [place:B503col02row01]\",\"detail\":\"Moving the robot from [place:dock_1] to [place:B503col02row01]\"}]",
                "unix_millis_start_time": 7335080,
                "unix_millis_finish_time": 7415930,
                "original_estimate_millis": 62215,
                "estimate_millis": 0,
                "final_event_id": 0,
                "events": {
                    "0": {
                        "id": 0,
                        "status": "completed",
                        "name": "Sequence",
                        "detail": "",
                        "deps": [
                            1
                        ]
                    },
                    "1": {
                        "id": 1,
                        "status": "completed",
                        "name": "Go to [place:B503col02row01]",
                        "detail": "Moving the robot from [place:dock_1] to [place:B503col02row01]",
                        "deps": [
                            2
                        ]
                    },
                    "2": {
                        "id": 2,
                        "status": "completed",
                        "name": "Move to [place:B503col02row01] <    234.72   -167.975 -0.0077101> through 13 points",
                        "detail": "",
                        "deps": []
                    }
                },
                "skip_requests": null
            }
        },
        "completed": [
            1
        ],
        "active": 1,
        "pending": [],
        "interruptions": null,
        "cancellation": null,
        "killed": null
    },
    {
        "booking": {
            "id": "6d515065-c198-4496-a295-57f7bbbba4e4",
            "unix_millis_earliest_start_time": 1623010,
            "unix_millis_request_time": null,
            "priority": null,
            "labels": null,
            "requester": "requester_2"
        },
        "category": "teleop",
        "detail": "",
        "unix_millis_start_time": 1681480,
        "unix_millis_finish_time": 1851820,
        "original_estimate_millis": 0,
        "estimate_millis": 0,
        "assigned_to": {
            "group": "tinyRobot",
            "name": "tinyRobot8"
        },
        "status": null,
        "dispatch": null,
        "phases": {
            "1": {
                "id": 1,
                "category": "Sequence",
                "detail": "[{\"category\":\"Go to [place:B501col01row01]\",\"detail\":\"Moving the robot from [place:dock_8] to [place:B501col01row01]\"}]",
                "unix_millis_start_time": 1681440,
                "unix_millis_finish_time": 1851820,
                "original_estimate_millis": 150619,
                "estimate_millis": 0,
                "final_event_id": 0,
                "events": {
                    "0": {
                        "id": 0,
                        "status": "completed",
                        "name": "Sequence",
                        "detail": "",
                        "deps": [
                            1
                        ]
                    },
                    "1": {
                        "id": 1,
                        "status": "completed",
                        "name": "Go to [place:B501col01row01]",
                        "detail": "Moving the robot from [place:dock_8] to [place:B501col01row01]",
                        "deps": [
                            2
                        ]
                    },
                    "2": {
                        "id": 2,
                        "status": "completed",
                        "name": "Move to [place:B501col01row01] <    246.318    -168.095 -0.00915504> through 16 points",
                        "detail": "",
                        "deps": []
                    }
                },
                "skip_requests": null
            }
        },
        "completed": [
            1
        ],
        "active": 1,
        "pending": [],
        "interruptions": null,
        "cancellation": null,
        "killed": null
    },
    {
        "booking": {
            "id": "6d515065-c198-4496-a295-57f7bbbba4e3",
            "unix_millis_earliest_start_time": 1623010,
            "unix_millis_request_time": null,
            "priority": null,
            "labels": null,
            "requester": null
        },
        "category": "teleop",
        "detail": "",
        "unix_millis_start_time": 1681480,
        "unix_millis_finish_time": 1851820,
        "original_estimate_millis": 0,
        "estimate_millis": 0,
        "assigned_to": {
            "group": "tinyRobot",
            "name": "tinyRobot8"
        },
        "status": null,
        "dispatch": null,
        "phases": {
            "1": {
                "id": 1,
                "category": "Sequence",
                "detail": "[{\"category\":\"Go to [place:B501col01row01]\",\"detail\":\"Moving the robot from [place:dock_8] to [place:B501col01row01]\"}]",
                "unix_millis_start_time": 1681440,
                "unix_millis_finish_time": 1851820,
                "original_estimate_millis": 150619,
                "estimate_millis": 0,
                "final_event_id": 0,
                "events": {
                    "0": {
                        "id": 0,
                        "status": "completed",
                        "name": "Sequence",
                        "detail": "",
                        "deps": [
                            1
                        ]
                    },
                    "1": {
                        "id": 1,
                        "status": "completed",
                        "name": "Go to [place:B501col01row01]",
                        "detail": "Moving the robot from [place:dock_8] to [place:B501col01row01]",
                        "deps": [
                            2
                        ]
                    },
                    "2": {
                        "id": 2,
                        "status": "completed",
                        "name": "Move to [place:B501col01row01] <    246.318    -168.095 -0.00915504> through 16 points",
                        "detail": "",
                        "deps": []
                    }
                },
                "skip_requests": null
            }
        },
        "completed": [
            1
        ],
        "active": 1,
        "pending": [],
        "interruptions": null,
        "cancellation": null,
        "killed": null
    },
    {
        "booking": {
            "id": null,
            "unix_millis_earliest_start_time": 1623010,
            "unix_millis_request_time": null,
            "priority": null,
            "labels": null,
            "requester": null
        },
        "category": "teleop",
        "detail": "",
        "unix_millis_start_time": 1681480,
        "unix_millis_finish_time": 1851820,
        "original_estimate_millis": 0,
        "estimate_millis": 0,
        "assigned_to": {
            "group": "tinyRobot",
            "name": "tinyRobot8"
        },
        "status": "in progress",
        "dispatch": null,
        "phases": {
            "1": {
                "id": 1,
                "category": "Sequence",
                "detail": "[{\"category\":\"Go to [place:B501col01row01]\",\"detail\":\"Moving the robot from [place:dock_8] to [place:B501col01row01]\"}]",
                "unix_millis_start_time": 1681440,
                "unix_millis_finish_time": 1851820,
                "original_estimate_millis": 150619,
                "estimate_millis": 0,
                "final_event_id": 0,
                "events": {
                    "0": {
                        "id": 0,
                        "status": "completed",
                        "name": "Sequence",
                        "detail": "",
                        "deps": [
                            1
                        ]
                    },
                    "1": {
                        "id": 1,
                        "status": "completed",
                        "name": "Go to [place:B501col01row01]",
                        "detail": "Moving the robot from [place:dock_8] to [place:B501col01row01]",
                        "deps": [
                            2
                        ]
                    },
                    "2": {
                        "id": 2,
                        "status": "completed",
                        "name": "Move to [place:B501col01row01] <    246.318    -168.095 -0.00915504> through 16 points",
                        "detail": "",
                        "deps": []
                    }
                },
                "skip_requests": null
            }
        },
        "completed": [
            1
        ],
        "active": 1,
        "pending": [],
        "interruptions": null,
        "cancellation": null,
        "killed": null
    }
];