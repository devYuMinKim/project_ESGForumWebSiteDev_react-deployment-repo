import React from "react";
import FormInput from "../../layout/login";
import FormTextarea from "../../layout/dashboard/textarea";

interface AddCommitteeModalProps {
  showModal: boolean;
  committe: string;
  explanation: string;
  error: string;
  setShowModal: (show: boolean) => void;
  setCommitte: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setExplanation: React.Dispatch<React.SetStateAction<string>>;
}

const AddCommitteeModal: React.FC<AddCommitteeModalProps> = ({
  showModal,
  committe,
  explanation,
  error,
  setShowModal,
  setError,
  handleSubmit,
  setCommitte,
  setExplanation,
}) => {
  return (
    <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold mt-2">
                    위원회 추가
                  </h3>
                  <h3
                    className="text-3xl text-slate-500 cursor-pointer"
                    onClick={() => {
                      setCommitte("");
                      setExplanation("");
                      setShowModal(false);
                      setError("");
                    }
                    }
                  >
                    ×
                  </h3>
                </div>
                <div className="relative py-12 px-10  flex-auto">
                  <form className="space-y-6 relative" onSubmit={handleSubmit}>
                    <FormInput
                      id="name"
                      label="이름"
                      type="text"
                      autoComplete="name"
                      placeholder="위원회 이름을 적어주세요."
                      value={committe}
                      onChange={(e) => setCommitte(e.target.value)}
                    />
                    <FormTextarea
                      id="explanation"
                      label="설명"
                      autoComplete="explanation"
                      placeholder="위원회에 대한 설명을 적어주세요."
                      value={explanation}
                      onChange={(e) => setExplanation(e.target.value)}
                    />
                    <button
                      className="absolute top-30 right-0 bg-green-500 text-white font-bold uppercase text-sm px-3 py-1 rounded shadow hover:shadow-lg mb-5"
                      type="submit"
                    >
                      추가
                    </button>
                    <p>
                      {error}
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default AddCommitteeModal;
