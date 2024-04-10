import React, { useRef, useState } from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';

export default function Write() {
  const [showLink, setShowLink] = useState(false);
  const idRef = useRef();
  const titleRef = useRef();
  const contentRef = useRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    const id = idRef.current.value;
    const title = titleRef.current.value;
    const content = contentRef.current.value;

    if (!id || !title || !content) {
      alert('id, title, content are required');
      return;
    }

    if (id && title && content) {
      fetch('/api/post/write', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, title, content }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            alert(data.message);
            setShowLink(true);
          }
          if (data.error) {
            throw new Error(data.error);
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };
  return (
    <Layout>
      <h1>Write a Post</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" id="id" placeholder="id" ref={idRef} required />
        <br />
        <input
          type="text"
          id="title"
          placeholder="title"
          ref={titleRef}
          required
        />
        <br />
        <textarea
          type="text"
          id="content"
          placeholder="content"
          ref={contentRef}
          required
        />
        <br />
        <input type="submit" value="create" />
      </form>
      {showLink && (
        <Link href={`/posts/${idRef.current.value}`}>View article</Link>
      )}
    </Layout>
  );
}
