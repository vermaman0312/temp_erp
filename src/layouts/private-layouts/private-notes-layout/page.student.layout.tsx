import React, { useCallback, useState } from "react";
import "../../../css/scroll-container.css";
import CustomAlertDialogBox from "../../../components/custom-alert-dialogbox/custom.alert-dialogbox.component";
import "../../../css/scroll-container.css";
import {
  PrivateNoteFormPageTemplate,
  PrivateNoteListPageTemplate,
  PrivateNoteNotFoundPageTemplate,
  PrivateNotesHeadingPageTemplate,
} from "../../../templates/private-templates/private-notes-template/page.student.template";
import { noteList } from "../../../mock/note-data";
import CustomLoader from "../../../components/custom-loader/custom-loader.component";

type noteType = {
  id: string;
  title: string;
  description: string | undefined;
  isSelected: boolean;
  isHide: boolean;
  isPinned: boolean;
  isDeleted: boolean;
  timeStamp: Date;
};

const PrivateNotePageLayout = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState<boolean>(false);
  const [notes, setNotes] = useState<Array<noteType>>(noteList);
  const [addNote, setAddNote] = useState<noteType>({
    id: "",
    title: "",
    description: "",
    isSelected: false,
    isHide: false,
    isPinned: false,
    isDeleted: false,
    timeStamp: new Date(),
  });
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [isNotePadOpen, setIsNotePadOpen] = useState<boolean>(false);
  const [isNoteDetails, setIsNoteDetails] = useState<noteType>();
  const [isDeletedNoteOpen, setIsDeletedNoteOpen] = useState<boolean>(false);
  const [noteId, setNoteId] = useState<string>("");

  const onChangeNoteTitle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setAddNote({
        ...addNote,
        id: Math.floor(Math.random() * 16777215).toString(16),
        title: event.target.value,
        description: " ",
      });
    },
    [addNote]
  );
  const handleCreateNote = useCallback(() => {
    setNotes((currentNotes) => [...currentNotes, addNote]);
    setIsCreateNoteOpen(false);
  }, [addNote]);
  const handleSelectUnSelect = useCallback((id: string) => {
    setNotes((currentNotes) =>
      currentNotes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            isSelected: !note.isSelected,
          };
        }
        return note;
      })
    );
  }, []);
  const handlePinnedUnPinned = useCallback((id: string) => {
    setNotes((currentNotes) =>
      currentNotes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            isPinned: !note.isPinned,
          };
        }
        return note;
      })
    );
  }, []);
  const handleHideUnhide = useCallback((id: string) => {
    setNotes((currentNotes) =>
      currentNotes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            isHide: !note.isHide,
          };
        }
        return note;
      })
    );
  }, []);
  const handleNoteDelete = useCallback(() => {
    setNotes((currentNotes) =>
      currentNotes.map((note) => {
        if (note.id === noteId) {
          return {
            ...note,
            isDeleted: !note.isDeleted,
          };
        }
        return note;
      })
    );
  }, [noteId]);
  const handleUpdateNote = useCallback(() => {
    setNotes((currentNotes) =>
      currentNotes.map((note) => {
        if (note.id === noteId) {
          return {
            ...note,
            description: isNoteDetails?.description,
          };
        }
        return note;
      })
    );
  }, [isNoteDetails?.description, noteId]);

  return (
    <div className="w-full h-full flex flex-col items-start justify-start scroll-container">
      {!isNotePadOpen && (
        <div className="w-full">
          <PrivateNotesHeadingPageTemplate
            isOpen={isCreateNoteOpen}
            onOpenChange={setIsCreateNoteOpen}
            onClickAddNote={() => setIsCreateNoteOpen(true)}
            onChange={onChangeNoteTitle}
            onSubmitAddNot={handleCreateNote}
            onClickUnhide={() => setIsHidden(false)}
            onClickHide={() => setIsHidden(true)}
            isHidden={isHidden}
          />
        </div>
      )}

      {!isNotePadOpen && (
        <div className="h-[50px] w-full mt-5">
          {(notes?.length === 0 || notes?.length === undefined) && (
            <PrivateNoteNotFoundPageTemplate />
          )}
          {(notes?.length !== 0 || notes?.length !== undefined) && (
            <PrivateNoteListPageTemplate
              isHidden={isHidden}
              notes={notes}
              onClick={(id, note) => {
                setNoteId(id);
                setIsNoteDetails(note);
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);
                  setIsNotePadOpen(true);
                }, 5000);
              }}
              onClickSelectUnSelect={(id) => handleSelectUnSelect(id)}
              onClickHideUnhide={(id) => handleHideUnhide(id)}
              onClickPinnedUnPinned={(id) => handlePinnedUnPinned(id)}
              onClickDelete={(id) => {
                setNoteId(id);
                setIsDeletedNoteOpen(true);
              }}
            />
          )}
        </div>
      )}
      {isNotePadOpen && (
        <div className="h-[50px] w-full mt-5">
          <PrivateNoteFormPageTemplate
            onClickBack={() => setIsNotePadOpen(false)}
            value={isNoteDetails?.description}
            title={isNoteDetails?.title}
            timeStamp={isNoteDetails?.timeStamp}
            setValue={(value) =>
              setIsNoteDetails((prevState) => ({
                ...prevState,
                description: value,
                id: prevState?.id ?? "",
                title: prevState?.title ?? "",
                isSelected: prevState?.isSelected ?? false,
                isHide: prevState?.isHide ?? false,
                isPinned: prevState?.isPinned ?? false,
                isDeleted: prevState?.isDeleted ?? false,
                timeStamp: new Date(),
              }))
            }
            onClick={handleUpdateNote}
          />
        </div>
      )}
      <div>
        <CustomAlertDialogBox
          isDeleteOpen={isDeletedNoteOpen}
          onOpenChange={setIsDeletedNoteOpen}
          title="Are you absolutely sure?"
          description="This action cannot be undone. This will permanently delete your
            account and remove your data from our servers."
          buttonTitle1="Cancel"
          buttonTitle2="Delete"
          onClick={handleNoteDelete}
        />
      </div>
      {isLoading && (
        <CustomLoader
        // backgroundTransparent={true}
        // backgroundLoader="bg-[#0d1b2a]"
        // loaderColor="text-white"
        />
      )}
    </div>
  );
};

export default PrivateNotePageLayout;
