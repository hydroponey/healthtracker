import { type ReactNode } from 'react';
import Navbar from './navbar'

interface Props {
    children: ReactNode;
}

export default function Layout({ children }: Props) {
    const links = [
      {href: '/', name: 'Home'},
      {href: '/meals', name: 'Meals'},
      {href: '/workouts', name: 'Workouts'},
      {href: '/cardio', name: 'Cardio'},
      {href: '/sleep', name: 'Sleep'},
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar links={links} />
            <div>{children}</div>
        </div>
    )
}