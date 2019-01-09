export const MOCK_DATA = {
    "exercise_name":"Exercise in January",
    "date":"Sun Apr 15 00:00:00 CEST 2018",
    "assessments":[
       {
          "title":"Information technology test",
          "instructions":"This quiz is designed to broaden the knowledge of the Grade Ten Information Technology.",
          "type":"test",
          "position":1,
          "order":1,
          "questions":[
             {
                "type":"FFQ",
                "text":"Write name of one malicious software?",
                "points":6,
                "penalty":3,
                "order":1,
                "required":true,
                "correctChoices":[
                   "viruses",
                   "trojans",
                   "worms",
                   "bots"
                ],
                "answers":[
                    {
                        "userName":"Peter",
                        "text":"trojans"
                    },
                    {
                        "userName":"John",
                        "text":"viruses"
                    },
                    {
                        "userName":"Martin",
                        "text":"McAfee"
                    },
                    {
                        "userName":"Lucas",
                        "text":"keylogger"
                    },
                    {
                        "userName":"Paul",
                        "text":"dunno"
                    }
                ]
             },
             {
                "type":"MCQ",
                "text":"Among the following choices, select all the possible methods of prevention against an unwanted file upload.",
                "points":4,
                "penalty":2,
                "order":2,
                "required":true,
                "choices":[
                   {
                      "order":0,
                      "text":"whitelisting file extensions",
                      "isCorrect":true
                   },
                   {
                      "order":1,
                      "text":"limiting maximum file size",
                      "isCorrect":true
                   },
                   {
                      "order":2,
                      "text":"using database triggers",
                      "isCorrect":false
                   },
                   {
                      "order":3,
                      "text":"saving data to an NTFS volume",
                      "isCorrect":false
                   }
                ],
                "answers":[
                   {
                      "userName":"Peter",
                      "choices":[
                         0,
                         1
                      ]
                   },
                   {
                        "userName":"John",
                        "choices":[
                            1
                    ]
                    },
                    {
                        "userName":"Martin",
                        "choices":[
                            2,
                            3,
                            0
                        ]
                    },
                    {
                        "userName":"Lucas",
                        "choices":[
                            0
                        ]
                    },
                    {
                        "userName":"Paul",
                        "choices":[
                            1
                        ]
                    }
                ]
             },
             {
                "type":"EMI",
                "text":"Connect the following exemplary situations with the corresponding type of password attack.",
                "points":3,
                "penalty":1,
                "order":3,
                "required":true,
                "choices":[
                   {
                      "order":0,
                      "text":"trying all possible alphanumeric combinations of 8 characters",
                      "pair":6
                   },
                   {
                      "order":1,
                      "text":"trying common words of English language",
                      "pair":4
                   },
                   {
                      "order":2,
                      "text":"looking up the value of a hashed password",
                      "pair":7
                   },
                   {
                      "order":3,
                      "text":"tricking a user into giving away his password by posing as a service administrator",
                      "pair":5
                   },
                   {
                      "order":4,
                      "text":"dictionary attack",
                      "pair":1
                   },
                   {
                      "order":5,
                      "text":"social engineering",
                      "pair":3
                   },
                   {
                      "order":6,
                      "text":"brute force attack",
                      "pair":0
                   },
                   {
                      "order":7,
                      "text":"rainbow table attack",
                      "pair":2
                   }
                ],
                "answers":[
                   {
                      "userName":"Peter",
                      "pairs":[
                         [
                            0,
                            6
                         ],
                         [
                            1,
                            4
                         ],
                         [
                            2,
                            7
                         ],
                         [
                            3,
                            5
                         ]
                      ]
                   },
                   {
                    "userName":"Martin",
                    "pairs":[
                       [
                          0,
                          6
                       ],
                       [
                          1,
                          4
                       ],
                       [
                          3,
                          7
                       ],
                       [
                          2,
                          5
                       ]
                    ]
                 },
                 {
                    "userName":"John",
                    "pairs":[
                       [
                          3,
                          6
                       ],
                       [
                          2,
                          4
                       ],
                       [
                          1,
                          7
                       ],
                       [
                          0,
                          5
                       ]
                    ]
                 },
                 {
                    "userName":"Lucas",
                    "pairs":[
                       [
                          0,
                          6
                       ],
                       [
                          2,
                          4
                       ],
                       [
                          1,
                          7
                       ],
                       [
                          3,
                          5
                       ]
                    ]
                 },
                 {
                    "userName":"Paul",
                    "pairs":[
                       [
                          3,
                          4
                       ],
                       [
                          2,
                          6
                       ],
                       [
                          1,
                          7
                       ],
                       [
                          0,
                          5
                       ]
                    ]
                 }
                ]
             }
          ]
       }
    ]
 };