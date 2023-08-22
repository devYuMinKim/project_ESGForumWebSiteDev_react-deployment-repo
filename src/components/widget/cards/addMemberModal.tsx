import React from 'react';
import FormInput from '../../layout/login';

interface AddMemberModalProps {
  showModal: boolean;
  name: string;
  affiliation: string;
  error: string;
  setShowModal: (show: boolean) => void;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setAffiliation: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({
  showModal,
  name,
  affiliation,
  error,
  setShowModal,
  setName,
  setAffiliation,
  handleSubmit,
  setError,
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
                    회원 추가
                  </h3>
                  <h3
                    className="text-3xl text-slate-500 cursor-pointer"
                    onClick={() => {
                      setName("");
                      setAffiliation("");
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
                      onChange={(e) => setName(e.target.value)}
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

export default AddMemberModal;
