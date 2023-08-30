import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Seminar } from "../types/seminars.interface";
import { getSeminarById } from "../services/seminar.service";

const SeminarDetailPage = () => {
  const [seminar, setSeminar] = useState<Seminar | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    (async () => {
      if (!id) return;

      const response = await getSeminarById(id);

      if (!response) return;

      setSeminar(response);
    })();
  }, [id]);

  if (!seminar) return <div>Loading...</div>;

  return (
    <>
      <h1>{seminar.subject}</h1>
      <p>{seminar.host}</p>
    </>
  );
};

export default SeminarDetailPage;
