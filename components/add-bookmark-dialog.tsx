'use client'

import { useState } from 'react'
import { BookmarkPlus, Tag } from 'lucide-react'
import { Dialog, Button, Flex, TextField, Text, TextArea, Badge, Card } from '@radix-ui/themes'

const AddBookmarkDialog = () => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [tempTag, setTempTag] = useState('')
  const [tags, setTags] = useState<string[]>([])

  const EXAMPLE_TAGS = ['NodeJS', 'NextJS', 'Docker', 'Tutorial']

  const handleSetTag = (tag: string) => {
    if (tags.indexOf(tag) === -1) {
      setTags([...tags, tag])
      setTempTag('')
    }
  }

  const handleTagSearch = (tag: string) => {
    setTempTag(tag)
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>
          <BookmarkPlus />
          Add Bookmark
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Add new bookmark</Dialog.Title>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Title
            </Text>
            <TextField.Root
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="How to dockerize a Node app"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Url
            </Text>
            <TextField.Root
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter the URL to bookmark"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Description
            </Text>
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="The example is with NextJS, but you can use it with any other framework based on NodeJS"
            >
            </TextArea>
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Tags
            </Text>
            <TextField.Root
              value={tempTag}
              onChange={(e) => handleTagSearch(e.target.value)}
              onKeyUp={(e) => e.key === 'Enter' && handleSetTag(tempTag)}
              placeholder="Enter tag name"
            />
            <Card className='text-xs flex flex-row flex-wrap gap-2'>
              {EXAMPLE_TAGS.map((tag, i) => (<Badge key={i} onClick={() => handleSetTag(tag)}><Tag size="12" />{tag}</Badge>))}
            </Card>
            <div className='flex flex-row flex-wrap gap-2 mt-2'>
              {tags.map((tag, i) => (<Badge key={i}><Tag size="12" />{tag}</Badge>))}
            </div>
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default AddBookmarkDialog
