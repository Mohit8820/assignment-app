import React, { useState, useEffect, useContext } from "react";
import Modal from "react-modal";

import File from "./ModalElements/File";
import Link from "./ModalElements/Link";
import Text from "./ModalElements/Text";
import GlobalState from "../../../contexts/GlobalState";
import Delete from "./ModalElements/Delete";

Modal.defaultStyles.overlay.backgroundColor = "rgba(74, 73, 73, 0.7)";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "1.5rem",
    background: "#FFFFFF",
  },
};
Modal.setAppElement("#root");

const SubmissionPending = (props) => {
  const [ids, setIds] = useContext(GlobalState);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalText, setModalText] = useState("");

  function openModal(event) {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }
  function closeModal() {
    setIsOpen(false);
  }

  var question = props.question;

  /**********under evaluation */
  const [deleteType, setDeleteType] = useState(null);
  const [deleteFile, setDeleteFile] = useState({
    fname: "",
    flink: "",
    index: null,
  });
  const [deleteLink, setDeleteLink] = useState({
    ltext: "",
    link: "",
    index: null,
  });
  const [deleteText, setDeleteText] = useState(null);

  let sub;
  if (question.submissions)
    sub = question.submissions[question.submissions.length - 1];
  else sub = null;

  if (question.submissions) {
    var dateObj = new Date(sub.updatedAt);
    var month = dateObj.getUTCMonth(); //months from 0-11
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var newdate = day + " " + monthNames[month] + ", " + year;
  } else newdate = "-";

  /************************* */

  const [submit, setSubmit] = useState(false);
  const [files, setFiles] = useState([]);
  const [text, setText] = useState("");
  const [links, setLinks] = useState([]);

  //resetting submit status

  useEffect(() => {
    //   setSolution("");
    setSubmit(false);
    setFiles([]);
    setText("");
    setLinks([]);
  }, [props.question, props.question.status]);

  console.log("rendered submitsec" + question.question_no);

  function getFiles(files) {
    /*setFiles((prevFiles) => {
      return [...prevFiles, ...files];
    });*/

    setFiles(files);
    // console.log(files);
  }

  function getLinks(links) {
    setLinks(links);
  }
  function getText(text) {
    setText(text);
  }

  async function uploadFile() {
    let formData = new FormData();

    const aid = 123;
    formData.append("assignment_id", props.assignmentId);
    formData.append("student_id", ids.student_id);
    formData.append("subject_id", ids.subject_id);
    //formData.append("submission_id", "63076a7b810d1312a3ddc61c");
    formData.append("attempt", 1);
    formData.append("question_no", question.question_no);
    formData.append("question", question.question);
    if (question.points) formData.append("points", question.points); //take if points in question else leave
    formData.append("aid", aid);
    formData.append("n", files.length);

    [...files].forEach((file, i) => {
      formData.append(aid + "_" + i, file);
    });

    links.forEach((link, i) => {
      formData.append("link", link.url);
      formData.append("linkText", link.text);
    });

    if (text !== null) formData.append("text", text);

    var submit = "/submit";
    var url = "https://assignment-backend-tutedude.herokuapp.com";
    var method = "POST";
    if (question.status === "completed") {
      let sub;
      if (question.submissions)
        sub = question.submissions[question.submissions.length - 1];
      else sub = null;
      formData.append("submission_id", question.submission_id);
      formData.append("attempt", sub.attempt + 1);
      submit = "/resubmit";
    }
    if (question.status === "submitted") {
      let sub;
      if (question.submissions)
        sub = question.submissions[question.submissions.length - 1];
      else sub = null;
      formData.append("submission_id", question.submission_id);
      formData.append("list_id", sub._id);
      submit = "/submission";
      method = "PUT";
    }

    for (var key of formData.entries()) {
      console.log(key[0]);
      console.log(key[1]);
    }

    let a = await fetch(url + submit, {
      method: method,
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data");
        console.log(data);
        if (data.success === true) {
          setSubmit(true);
          props.sendData(data);
        } else {
          openModal();
        }
      });
    /*      .then((response, data) => {
        console.log("response");
        console.log(response);
        console.log("data");
        console.log(data);
        if (response.success === true) {
          setSubmit(true);
          props.sendData(data);
        } else {
          openModal();
        }
      });*/

    /*.then((response, data) => {
      console.log("Response in uploadFile....");
      console.log(response);
      console.log(data);
      if (response.status == 200) {
        alert("Assignment Submitted!");
        for (let i = 0; i < files.length; i++) {
          let temp = document.getElementById(aid + "_" + i);
          console.log(temp);
          if (temp != undefined) temp.disabled = true;
          // fileList.push(temp);
        }
      } else {
        alert("Could not submit assignment!");
      }
    });*/
    console.log("A = ", a);
    return a;
    //} else alert("Please submit all the questions");

    // console.log("In uploadFile");
    // let file = document.getElementById("myFile").files;
    // console.log(document.getElementById("myFile"));
    // console.log(file);
    //formData.append("fileupload", file);
    //console.log(formData.entries);
  }

  /************************* */ /*
  async function submitAssignment(
    student_id,
    assignment_id,
    subject_id,
    aid,
    n,
    question_no,
    question
  ) {
    let count = 1;
    console.log("In submitAssignment");
    let formData = new FormData();
    // console.log(file);
    let fileList = [];
    let flag = true;
    for (let i = 0; i < n; i++) {
      let temp = document.getElementById(aid + "_" + i).files[0];
      console.log(temp);
      if (temp != undefined) formData.append(aid + "_" + i, temp);
      // fileList.push(temp);
      else {
        flag = false;
        break;
      }
    }
    if (flag) {
      // let files = document.getElementById(aid + "");
      // console.log("fl...", fileList);
      // console.log(files.files);
      // formData.append("fileupload", fileList);
      // formData.append("question_no", qno);
      formData.append("aid", aid);
      formData.append("n", n);
      formData.append("assignment_id", assignment_id);
      formData.append("student_id", student_id);
      formData.append("subject_id", subject_id);
      formData.append("submission_id", "63076a7b810d1312a3ddc61c");

      formData.append("attempt", count + 1);
      formData.append("question_no", question_no);
      formData.append("question", question);
      formData.append("points", 2);

      console.log(formData);
      let a = await fetch("/resubmit", {
        method: "POST",
        body: formData,
      }).then((response, data) => {
        console.log("Response in uploadFile....");
        console.log(response);
        console.log(data);
        if (response.status == 200) {
          alert("Assignment Submitted!");
          for (let i = 0; i < n; i++) {
            let temp = document.getElementById(aid + "_" + i);
            console.log(temp);
            if (temp != undefined) temp.disabled = true;
            // fileList.push(temp);
          }
        } else {
          alert("Could not submit assignment!");
        }
      });
      console.log("A = ", a);
      return a;
    } else alert("Please submit all the questions");
  }*/
  /******************************* */

  function submitHandler(event) {
    event.preventDefault();
    console.log("files");
    console.log(files);
    console.log("links");
    console.log(links);
    console.log("text");
    console.log(text);
    console.log("abc");
    /*if (question.status === "completed") reUploadFile();
    else */
    uploadFile();

    setFiles([]);
    setLinks([]);
    setText("");
  }

  function viewSolutionButtonHandler() {
    props.changeSec();
  }
  return (
    <div className="sub-pending-sec">
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {modalType === "text" ? (
          <Text close={closeModal} passText={getText} previousText={text} />
        ) : modalType === "file" ? (
          <File close={closeModal} passFiles={getFiles} previousFiles={files} />
        ) : modalType === "link" ? (
          <Link close={closeModal} passLinks={getLinks} previousLinks={links} />
        ) : modalType === "delete" ? (
          <Delete
            close={closeModal}
            deleteType={deleteType}
            deleteFile={deleteFile}
            deleteLink={deleteLink}
            deleteText={deleteText}
            assignmentId={props.assignmentId}
            question={question}
            sendData={props.sendData}
          />
        ) : modalType === "viewText" ? (
          <div>{modalText}</div>
        ) : (
          <div>error</div>
        )}
      </Modal>
      {!submit && (
        <div className="before-submit">
          <div>
            <h3>Question</h3>
            <p>{question.question}</p>
            {question.instructions && question.status === "pending" && (
              <div>
                <h3>Instructions</h3>
                <p>{question.instructions}</p>
              </div>
            )}
            {question.status === "completed" && (
              <div className="center">
                <button onClick={viewSolutionButtonHandler}>
                  View Previous Solution
                </button>
              </div>
            )}
          </div>
          {question.status === "submitted" && (
            <div className="flex-column">
              <h3>
                Solution You Submitted <span>(updated on {newdate})</span>
              </h3>
              <div className="white-area">
                {sub !== null && sub.filename && (
                  <>
                    {sub.filename.map((fname, index) => (
                      <React.Fragment key={index}>
                        <div className="white-area-element">
                          <span>{fname}</span>
                          <section>
                            <a
                              href={`https://do4t98vdpdesj.cloudfront.net/${sub.filelink[index]}`}
                              target="_blank"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 21l-8-9h6v-12h4v12h6l-8 9zm9-1v2h-18v-2h-2v4h22v-4h-2z" />
                              </svg>
                            </a>

                            <button
                              className="delete-button"
                              onClick={(event) => {
                                setModalType("delete");
                                setDeleteFile((prev) => ({
                                  ...prev,
                                  fname: fname,
                                  flink: sub.filelink[index],
                                  index: index,
                                }));
                                setDeleteType("file");
                                openModal(event);
                              }}
                              name="delete"
                            >
                              <svg
                                width="24"
                                height="24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m3-19h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z" />
                              </svg>
                            </button>
                          </section>
                        </div>
                      </React.Fragment>
                    ))}
                  </>
                )}
                {sub !== null && sub.text && sub.text !== "" && (
                  <div className="white-area-element">
                    <span>{sub.text.slice(0, 20)}</span>
                    <section>
                      <span
                        onClick={(event) => {
                          setModalText(sub.text);
                          setModalType("viewText");
                          openModal(event);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="m22 5c0-.478-.379-1-1-1h-18c-.62 0-1 .519-1 1v14c0 .621.52 1 1 1h18c.478 0 1-.379 1-1zm-1.5 13.5h-17v-13h17zm-6.065-9.978-5.917 5.921v-1.243c0-.414-.336-.75-.75-.75-.415 0-.75.336-.75.75v3.05c0 .414.335.75.75.75h3.033c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-1.219l5.918-5.922v1.244c0 .414.336.75.75.75s.75-.336.75-.75c0-.715 0-2.335 0-3.05 0-.414-.336-.75-.75-.75-.715 0-2.318 0-3.033 0-.414 0-.75.336-.75.75s.336.75.75.75z"
                            fillRule="nonzero"
                          />
                        </svg>
                      </span>

                      <button
                        className="delete-button"
                        onClick={(event) => {
                          setModalType("delete");
                          setDeleteText(sub.text);
                          setDeleteType("text");
                          openModal(event);
                        }}
                        name="delete"
                      >
                        <svg
                          width="24"
                          height="24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m3-19h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z" />
                        </svg>
                      </button>
                    </section>
                  </div>
                )}
                {sub !== null && sub.link && (
                  <>
                    {sub.link.map((l, index) => (
                      <React.Fragment key={index}>
                        <div className="white-area-element">
                          <span>
                            {l.length > 30 ? l.slice(0, 30) + "..." : l}
                          </span>
                          <section>
                            <a href={l}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                              >
                                <path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z" />
                              </svg>
                            </a>

                            <button
                              className="delete-button"
                              onClick={(event) => {
                                setModalType("delete");
                                setDeleteLink((prev) => ({
                                  ...prev,
                                  ltext: sub.linkText[index],
                                  link: l,
                                  index: index,
                                }));
                                setDeleteType("link");
                                openModal(event);
                              }}
                              name="delete"
                            >
                              <svg
                                width="24"
                                height="24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m3-19h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z" />
                              </svg>
                            </button>
                          </section>
                        </div>
                      </React.Fragment>
                    ))}
                  </>
                )}
              </div>
              <p>
                <strong>Note:</strong>the file has been submitted Successfully
              </p>
            </div>
          )}

          <div>
            <h3>Submit Solution as</h3>
            <div className="formButtons">
              <div>
                <button
                  className="attach-text"
                  onClick={(event) => {
                    setModalType("text");
                    openModal(event);
                  }}
                  value="text"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 0h-20v6h1.999c0-1.174.397-3 2.001-3h4v16.874c0 1.174-.825 2.126-2 2.126h-1v2h9.999v-2h-.999c-1.174 0-2-.952-2-2.126v-16.874h4c1.649 0 2.02 1.826 2.02 3h1.98v-6z" />
                  </svg>
                  Text
                </button>
                <button
                  className="attach-link"
                  onClick={(event) => {
                    setModalType("link");
                    openModal(event);
                  }}
                  value="link"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.033 6.966c.584.583.584 1.529 0 2.112l-7.955 7.956c-.583.583-1.529.583-2.112 0-.583-.583-.583-1.529 0-2.112l7.956-7.956c.582-.583 1.528-.583 2.111 0zm-9.138 13.386c-1.171 1.171-3.076 1.171-4.248 0-1.171-1.171-1.171-3.077 0-4.248l5.639-5.632c-1.892-.459-3.971.05-5.449 1.528l-2.147 2.147c-2.254 2.254-2.254 5.909 0 8.163 2.254 2.254 5.909 2.254 8.163 0l2.147-2.148c1.477-1.477 1.986-3.556 1.527-5.448l-5.632 5.638zm6.251-18.662l-2.146 2.148c-1.478 1.478-1.99 3.553-1.53 5.445l5.634-5.635c1.172-1.171 3.077-1.171 4.248 0 1.172 1.171 1.172 3.077 0 4.248l-5.635 5.635c1.893.459 3.968-.053 5.445-1.53l2.146-2.147c2.254-2.254 2.254-5.908 0-8.163-2.253-2.254-5.908-2.254-8.162-.001z" />
                  </svg>
                  link
                </button>
                <button
                  className="attach-file"
                  onClick={(event) => {
                    setModalType("file");
                    openModal(event);
                  }}
                  value="file"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17 5v12c0 2.757-2.243 5-5 5s-5-2.243-5-5v-12c0-1.654 1.346-3 3-3s3 1.346 3 3v9c0 .551-.449 1-1 1s-1-.449-1-1v-8h-2v8c0 1.657 1.343 3 3 3s3-1.343 3-3v-9c0-2.761-2.239-5-5-5s-5 2.239-5 5v12c0 3.866 3.134 7 7 7s7-3.134 7-7v-12h-2z" />
                  </svg>
                  File
                </button>
              </div>
              <form onSubmit={submitHandler} encType="multipart/form-data">
                <button
                  type="submit"
                  className="submit-solution"
                  disabled={
                    files.length === 0 &&
                    (text === null || text === "") &&
                    links.length === 0
                      ? true
                      : false
                  }
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {submit && (
        <div className="after-sub">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="#8a8a8a"
          >
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z" />
          </svg>
          Submitted Successfully!
        </div>
      )}
    </div>
  );
};
export default SubmissionPending;
