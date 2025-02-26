import { User, LogOut } from 'lucide-react'
import { auth, signIn, signOut } from '@/auth'
import { Text, Button, DropdownMenu, Avatar } from '@radix-ui/themes'

const Navbar = async () => {
  const session = await auth()

  const handleSignIn = async () => {
    'use server'
    await signIn('google', { redirectTo: '/dashboard' })
  }

  const handleSignOut = async () => {
    'use server'
    console.log('signing out')
    await signOut({ redirectTo: '/' })
  }

  return (
    <div className='flex flex-row justify-between p-5'>
      <div>My Bookmarks</div>
      {
        session ? (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar src={session.user?.image || ''} alt={session.user?.name || ''} fallback={<User className="h-4 w-4" />} />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content size="2" align="end">
              <DropdownMenu.Label>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{session.user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{session.user?.email}</p>
                </div>
              </DropdownMenu.Label>
              <DropdownMenu.Separator />
              <DropdownMenu.Item onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
                <Text color="red">Logout</Text>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        ) : (
          <Button onClick={handleSignIn}>Login</Button>
        )
      }
    </div>
  )
}

export default Navbar
