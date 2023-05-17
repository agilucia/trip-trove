'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Bio } from '../../../../database/bios';

type Props = {
  bios: Bio[];
  userId: number;
};

export default function BioForm(props: Props) {
  const [bios, setBios] = useState<Bio[]>(props.bios);
  const [idOnEditMode, setIdOnEditMode] = useState<number>();

  const [content, setContent] = useState<string>('');
  const [editContent, setEditContent] = useState<string>('');
  const [error, setError] = useState<string>();

  const router = useRouter();

  return (
    <main>
      <div>
        <label htmlFor="bio">Add info</label>
        <div>
          <input
            id="bio"
            value={content}
            placeholder="Share something about yourself"
            onChange={(event) => setContent(event.currentTarget.value)}
          />
          <button
            onClick={async () => {
              const response = await fetch('/api/bios', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  content,
                }),
              });

              const data = await response.json();

              if (data.error) {
                setError(data.error);
                return;
              }

              setBios([...bios, data.bio]);
              setContent('');
              router.refresh();
            }}
          >
            Save
          </button>
        </div>
        {typeof error === 'string' && (
          <div style={{ color: 'red' }}>{error}</div>
        )}
        <div>
          {bios.map((bio) => (
            <div key={`bio-${bio.id}`}>
              {idOnEditMode !== bio.id ? (
                bio.content
              ) : (
                <input
                  value={editContent}
                  onChange={(event) =>
                    setEditContent(event.currentTarget.value)
                  }
                />
              )}
              <div>
                {props.userId === bio.userId ? (
                  <button
                    onClick={async () => {
                      const response = await fetch(`/api/bios/${bio.id}`, {
                        method: 'DELETE',
                      });

                      const data = await response.json();

                      if (data.error) {
                        setError(data.error);
                        return;
                      }

                      setBios(
                        bios.filter(
                          (bioOnState) => bioOnState.id !== data.bio.id,
                        ),
                      );
                      router.refresh();
                    }}
                  >
                    x
                  </button>
                ) : (
                  <div />
                )}
                {props.userId === bio.userId && idOnEditMode !== bio.id ? (
                  <button
                    onClick={() => {
                      setIdOnEditMode(bio.id);
                      setEditContent(bio.content);
                    }}
                  >
                    edit
                  </button>
                ) : (
                  <div />
                )}
                {props.userId === bio.userId && idOnEditMode === bio.id ? (
                  <button
                    onClick={async () => {
                      const response = await fetch(`/api/bios/${bio.id}`, {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          content: editContent,
                        }),
                      });

                      const data = await response.json();

                      if (data.error) {
                        setError(data.error);
                        return;
                      }
                      setIdOnEditMode(undefined);

                      setBios(
                        bios.map((bioOnState) => {
                          return bioOnState.id !== data.bio.id
                            ? bioOnState
                            : data.bio;
                        }),
                      );
                      router.refresh();
                    }}
                  >
                    save
                  </button>
                ) : (
                  <div />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
