import styled from 'styled-components';
import { ReactComponent as AttachmentIcon } from '../../assets/icons/editor-attachment.svg';

interface AttachmentsProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Attachments = (props: AttachmentsProps) => {
  return (
    <>
      <label htmlFor="file-upload" className="w-fit">
        <AttachmentContainer>
          <AttachIcon>
            <AttachmentIcon />
          </AttachIcon>
          <AttachMention>파일 첨부하기</AttachMention>
        </AttachmentContainer>
      </label>
      <input id="file-upload" type="file" onChange={props.onChange} hidden />
    </>
  );
};

export default Attachments;

const AttachmentContainer = styled.div`
  padding: 5.97px 5.98px 5.97px 5.97px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
  &:active {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;
const AttachIcon = styled.div`
  margin-right: 5.97px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`;
const AttachMention = styled.div`
  padding: 5.97px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 400;
  line-height: normal;
  color: rgba(0, 0, 0, 1);
  text-align: right;
`;
