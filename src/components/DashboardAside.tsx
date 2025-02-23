'use client';

import { Button, Tooltip, Input, useDisclosure, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,  } from '@heroui/react';
import { Link2, Plus, Search, Tags, ListFilter, Tag } from 'lucide-react';
import { CreateLinkModal } from './CreateLinkModal';
import { useState } from 'react';

import { SharedSelection } from "@heroui/react";
import { CreateTagModal } from './CreateTagModal';
import { AsideHeader } from './AsideHeader';
import { AsideOptions } from './AsideOptions';

export function DashboardAside() {
  const { isOpen: isLinkModalOpen, onOpen: onLinkModalOpen, onOpenChange: onLinkModalOpenChange } = useDisclosure();
  const { isOpen: isTagModalOpen, onOpen: onTagModalOpen, onOpenChange: onTagModalOpenChange } = useDisclosure();

  const [selectedTags, setSelectedTags] = useState(new Set(['']))

  const updateSelectedTags = (keys: SharedSelection) => {
    setSelectedTags(new Set(keys as Iterable<string>));
  };

  const tags = [
    { key: "123", label: "Tag #1", },
    { key: "456", label: "Tag #2", },
    { key: "789", label: "Tag #3", },
    { key: "098", label: "Tag #4", },
  ];
  
  return (
    <>
      <aside className='flex justify-center items-end gap-2 w-full flex-wrap md:flex-col md:justify-start md:items-start md:w-52 md:pl-2 md:pr-2'>
        <AsideHeader selectedTags={selectedTags} setSelectedTags={updateSelectedTags} tags={tags}/>
        <AsideOptions onLinkModalOpen={onLinkModalOpen} onTagModalOpen={onTagModalOpen}/>
      </aside>

      <CreateLinkModal isLinkModalOpen={isLinkModalOpen} onLinkModalOpenChange={onLinkModalOpenChange}/>
      <CreateTagModal isTagModalOpen={isTagModalOpen} onTagModalOpenChange={onTagModalOpenChange}/>
    </>
  );
}


