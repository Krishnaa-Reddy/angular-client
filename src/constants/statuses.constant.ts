import { TaskStatus, StatusTemplate } from "../types/dev-tasks.type";

// TODO: Handle the colors and statuses here to increas reusability

export const statusTemplates : Record<TaskStatus, StatusTemplate> = {
    'TODO' : {
      status: 'Todo',
      hex: '#ee564e',
      hexClass: 'text-[#ee564e]',
      icon: 'lucideBan'
    },
    'PENDING' : {
      status: 'Pending',
      hex: '#ffcd56',
      hexClass: 'text-[#ffcd56]',
      icon: 'lucideClock2'
    },
    'DONE' : {
      status: 'Done',
      hex: '#4dbf42',
      hexClass: 'text-[#4dbf42]',
      icon: 'lucideBadgeCheck'
    },
  }