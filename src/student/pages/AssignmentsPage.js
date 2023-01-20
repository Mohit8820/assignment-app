import React, { useEffect, useState, useContext } from "react";
import $ from "jquery";

import AssignmentList from "../components/AssignmentList";
//import GlobalState from "../../contexts/GlobalState";
import "./AssignmentPage.css";

const AssignmestsPage = (props) => {
  //const [ids, setIds] = useContext(GlobalState);
  const ids = props.ids;
  console.log(ids);

  //const domain=http://tutedude.herokuapp.com
  const url = "https://assignment-backend-tutedude.herokuapp.com";

  /*const assignments = [
    {
      _id: "62e21ad8ef8ce43ddbdd3546",
      subject_id: 1,
      questions: [
        {
          question_no: 1,
          question: "WAP to check if the number is prime",
          points: "2",
          status: "submitted",
          submissions: [
            {
              //type: "file",
              attempt: 1,
              filelink: [
                "cloudfilename.ext",
                "cloudfilename.ext",
                "cloudfilename.ext",
                "cloudfilename.ext",
                "cloudfilename.ext",
                "cloudfilename.ext",
              ],
              filename: [
                "uploadedFileName",
                "uploadedFileName",
                "uploadedFileName",
                "uploadedFileName",
                "uploadedFileName",
                "uploadedFileName",
              ],
              link: ["url1", "url2"],
              linkText:[],
              text: "abc",
            },
            {
              attempt: 2,
              filelink: [],
              filename: [],
              link: ["url1", "url2"],
              text: "abc",
            },
            {
              attempt: 3,
              filelink: [],
              filename: [],
              link: [],
              text: "abc",
            },
          ],
        },
        {
          question_no: 2,
          question: "WAP completed",
          points: "1",
          instructions: "ABC",
          status: "completed",
          submissions: [
            {
              attempt: 1,
              filelink: ["cloudfilename.ext", "cloudfilename.ext"],
              filename: ["uploadedFileName", "uploadedFileName"],
              link: ["url1", "url2"],
              text: "abc",
              review: "review for attempt1",
            },
            {
              attempt: 2,
              filelink: ["cloudfilename.ext", "cloudfilename.ext"],
              filename: ["uploadedFileName", "uploadedFileName"],
              link: [],
              text: null,
              review: "review for attempt2",
            },
            {
              attempt: 3,
              filelink: [],
              filename: [],
              link: ["url1", "url2"],
              text: "abc",
              review: "review for attempt3",
            },
            {
              attempt: 4,
              filelink: [],
              filename: [],
              link: ["url1", "url2"],
              text: null,
              review: "review for attempt4",
            },
          ],
        },
        {
          question_no: 3,
          question: "WAP pending",
          points: "3",
          instructions: "ABC",
          status: "pending",
        },
        {
          question_no: 4,
          question: "WAP to check if",
          points: "2",
          status: "submitted",
          submissions: [
            {
              attempt: 1,
              filelink: [
                "cloudfilename.ext",
                "cloudfilename.ext",
                "uploadedFileName",
                "uploadedFileName",
                "uploadedFileName",
                "uploadedFileName",
                "uploadedFileName",
                "uploadedFileName",
              ],
              filename: [
                "uploadedFileName",
                "uploadedFileName",
                "uploadedFileName",
                "uploadedFileName",
                "uploadedFileName",
                "uploadedFileName",
                "uploadedFileName",
                "uploadedFileName",
              ],
              link: ["url1", "url2"],
              text: "abc",
            },
          ],
        },
      ],
    },
    {
      _id: "62e21ad8ef8ce43dd",
      subject_id: 1,
      questions: [
        {
          question_no: 1,
          question: "WAP completed",
          points: "1",
          instructions: "ABC",
          status: "completed",
          submissions: [
            {
              attempt: 1,
              filelink: ["cloudfilename.ext", "cloudfilename.ext"],
              filename: ["uploadedFileName", "uploadedFileName"],
              link: ["url1", "url2"],
              text: "abc",
              review: "review for attempt1",
            },
            {
              attempt: 2,
              filelink: ["cloudfilename.ext", "cloudfilename.ext"],
              filename: ["uploadedFileName", "uploadedFileName"],
              link: ["url1", "url2"],
              text: "abc",
              review: "review for attempt2",
            },
            {
              attempt: 3,
              filelink: ["cloudfilename.ext", "cloudfilename.ext"],
              filename: ["uploadedFileName", "uploadedFileName"],
              link: ["url1", "url2"],
              text: "abc",
              review: "review for attempt3",
            },
          ],
        },
      ],
    },
    {
      _id: "62e21ad8e",
      subject_id: 1,
      questions: [
        {
          question_no: 1,
          question: "WAP pending",
          points: "3",
          instructions: "ABC",
          status: "pending",
        },
        {
          question_no: 2,
          question: "WAP pending",
          points: "3",
          instructions: "ABC",
          status: "pending",
        },
        {
          question_no: 3,
          question: "WAP pending",
          points: "3",
          instructions: "ABC",
          status: "pending",
        },
      ],
    },
  ];
*/
  const [isLoading, setLoading] = useState(!true);
  /**/ const [assignments, setAssignments] = useState([]);
  useEffect(
    () => {
      if (ids.subject_id !== null && ids.student_id !== null) {
        $.ajax({
          url: `https://assignment-backend-tutedude.herokuapp.com/assignment/view?subject_id=${ids.subject_id}&student_id=${ids.student_id}`,
          type: "get",
          data: { student_id: 12, subject_id: 1 },
          processData: false,
          success: function (data, textStatus, jQxhr) {
            console.log(data);
            setAssignments(data.data);
          },
          error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
          },
        }).then(() => {
          const el = document.querySelector(".loader-container");
          if (el) {
            setLoading(!isLoading);
          }
        });
      }
    }, // eslint-disable-next-line
    []
  ); /**/

  function sendData(data) {
    console.log("hjk");
    if (ids.subject_id !== null && ids.student_id !== null) {
      $.ajax({
        url: `https://assignment-backend-tutedude.herokuapp.com/assignment/view?subject_id=${ids.subject_id}&student_id=${ids.student_id}`,
        type: "get",
        data: { student_id: 12, subject_id: 1 },
        processData: false,
        success: function (data, textStatus, jQxhr) {
          console.log(data);
          setAssignments(data.data);
        },
        error: function (jqXhr, textStatus, errorThrown) {
          console.log(errorThrown);
        },
      }).then(() => {
        const el = document.querySelector(".loader-container");
        if (el) {
          setLoading(!isLoading);
        }
      });
    }
  }

  // const ids = {
  //   student_id: 1,
  //   subject_id: 17,
  // };
  // exports.ids = ids;

  /* const assignments = [
    {
      assignment_id: "63070b2e85f6f1e1366b48dd",
      subject_id: 1,
      questions: [
        {
          question:
            "ABC lorem ipsum mohit prasad sah dndc cnvk dkv dkdv dcnd die kcnc kcdn dkjv",
          question_no: 1,
          instructions: "pqr",
          status: "completed",
          submissions: [
            {
              attempt: 1,
              filelink: [
                "https://tutedude.s3.ap-south-1.amazonaws.com/fc96a1bb011e10837b6477701.txt",
              ],
              filename: ["test.txt"],
              link: [],
              review: "Login module needed. Resubmit",
              correct: false,
              _id: "63076a7b810d1312a3ddc61e",
              addDate: "2022-08-25T12:26:35.695Z",
              updatedAt: "2022-08-25T12:26:35.695Z",
            },
            {
              attempt: 2,
              filelink: ["fc96a1bb011e10837b6477702.txt"],
              filename: ["test2.txt"],
              link: [],
              review: "Well done",
              correct: true,
              _id: "63076b39810d1312a3ddc625",
              updatedAt: "2022-08-25T12:29:45.554Z",
              addDate: "2022-08-25T12:29:45.554Z",
            },
          ],
        },
        {
          question: "WAP to print multiples of 6",
          question_no: 2,
          status: "pending",
        },
      ],
    },
  ];*/

  // function fakeRequest() {
  //   return new Promise((resolve) => setTimeout(() => resolve(), 1000));
  // }

  // useEffect(() => {
  //   fakeRequest().then(() => {
  //     const el = document.querySelector(".loader-container");
  //     if (el) {
  //       setLoading(!isLoading);
  //     }
  //   });
  // }, []);

  console.log("ass page rendered");
  return (
    <div>
      {isLoading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="Assignments">
          <h1>Course Name</h1>
          <div className="Assignment-head">
            <span>Sr. No.</span>
            <span>Assignments</span>
            <span>Status</span>
            <span>Progress</span>
            <span>Action</span>
          </div>
          <AssignmentList assignments={assignments} sendData={sendData} />
        </div>
      )}
    </div>
  );
};
export default AssignmestsPage;
