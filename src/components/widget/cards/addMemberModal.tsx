import React, { useState } from "react";
import FormInput from "../../layout/login";

interface AddMemberModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  handleSubmit: (name: string, affiliation: string) => Promise<void>;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({
  showModal,
  setShowModal,
  handleSubmit,
}) => {
  const [name, setName] = useState<string>("");
  const [affiliation, setAffiliation] = useState<string>("");

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
                    회원 추가
                  </h3>
                  <h3
                    className="text-3xl text-slate-500 cursor-pointer"
                    onClick={() => {
                      setName("");
                      setAffiliation("");
                      setShowModal(false);
                    }
                    }
                  >
                    ×
                  </h3>
                </div>
                <div className="pt-8 pb-12 px-10">
                  <form className="space-y-6 relative">
                    <FormInput
                      id="name"
                      label="이름"
                      type="text"
                      autoComplete="name"
                      placeholder="회원 이름을 적어주세요."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <FormInput
                      id="affiliation"
                      label="소속"
                      type="text"
                      autoComplete="affiliation"
                      placeholder="회원의 소속처를 적어주세요."
                      value={affiliation}
                      onChange={(e) => setAffiliation(e.target.value)}
                    />
                    <p></p>
                  </form>
                  <div className="relative">
                    <button
                      className="absolute top-30 right-0 bg-green-500 text-white font-bold text-sm px-3 py-1 rounded shadow hover:shadow-lg mb-5"
                      onClick={() => handleSubmit(name, affiliation)}
                    >
                      추가
                    </button>
                  </div>
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

export default AddMemberModal;
