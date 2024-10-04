import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Table, Modal, Button, TableCell } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

function Dashposts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userpost, setUserpost] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [showmore, setShowmore] = useState(true);
  const [showmodal, setShowmodal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!currentUser) {
        return;
      }

      try {
        // Fetch posts based on whether the user is an admin
        const url = currentUser.isAdmin 
          ? `/api/post/getposts` // Admin fetches all posts
          : `/api/post/getposts?userId=${currentUser._id}`; // Non-admin fetches their own posts

        const res = await fetch(url);
        const data = await res.json();

        if (res.ok) {
          setUserpost(data.posts);
          if (data.posts.length < 9) {
            setShowmore(false);
          }
        } else {
          setFetchError(data.message);
        }
      } catch (error) {
        setFetchError('Failed to fetch posts');
      }
    };

    fetchPosts();
  }, [currentUser]);

  const handleShowMore = async () => {
    const startIndex = userpost.length;
    try {
      const url = currentUser.isAdmin 
        ? `/api/post/getposts?startIndex=${startIndex}`
        : `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`;

      const res = await fetch(url);
      const data = await res.json();

      if (res.ok) {
        setUserpost((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowmore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async () => {
    try {
      const res = await fetch(`/api/post/deleteposts/${postToDelete}/${currentUser._id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        console.log(res.message);
      } else {
        setUserpost((prev) => prev.filter((post) => post._id !== postToDelete));
        setShowmodal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {fetchError ? (
        <p>{fetchError}</p>
      ) : userpost.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>Edit</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {userpost.map((post) => (
                <Table.Row key={post._id}>
                  <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <img src={post.image} alt={post.title} className="w-16 h-16 object-cover" />
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`} className="text-teal-500 hover:underline">
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setPostToDelete(post._id);
                        setShowmodal(true);
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/update-post/${post._id}`} className='text-teal-500 hover:underline'>
                      Edit
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          {showmore && (
            <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
              Show more
            </button>
          )}
        </>
      ) : (
        <p>No posts</p>
      )}
      <Modal
        show={showmodal}
        onClose={() => setShowmodal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this post?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeletePost}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowmodal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Dashposts;
