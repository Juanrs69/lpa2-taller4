'use client'

import { useState } from 'react'
import { Music2, Users, Heart, Moon, Sun, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UsersSection } from '@/components/sections/users-section'
import { SongsSection } from '@/components/sections/songs-section'
import { FavoritesSection } from '@/components/sections/favorites-section'
import DocumentationSection from '@/components/sections/documentation-section'

type Section = 'users' | 'songs' | 'favorites' | 'documentation'

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>('songs')
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
              <Music2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">MusicHub</h1>
              <p className="text-xs text-muted-foreground">
                Management Dashboard
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9"
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="flex gap-1">
            <Button
              variant={activeSection === 'songs' ? 'default' : 'ghost'}
              onClick={() => setActiveSection('songs')}
              className="gap-2 rounded-b-none"
            >
              <Music2 className="h-4 w-4" />
              Canciones
            </Button>
            <Button
              variant={activeSection === 'users' ? 'default' : 'ghost'}
              onClick={() => setActiveSection('users')}
              className="gap-2 rounded-b-none"
            >
              <Users className="h-4 w-4" />
              Usuarios
            </Button>
            <Button
              variant={activeSection === 'favorites' ? 'default' : 'ghost'}
              onClick={() => setActiveSection('favorites')}
              className="gap-2 rounded-b-none"
            >
              <Heart className="h-4 w-4" />
              Favoritos
            </Button>
            <Button
              variant={activeSection === 'documentation' ? 'default' : 'ghost'}
              onClick={() => setActiveSection('documentation')}
              className="gap-2 rounded-b-none"
            >
              <FileText className="h-4 w-4" />
              API Docs
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-6">
        {activeSection === 'users' && <UsersSection />}
        {activeSection === 'songs' && <SongsSection />}
        {activeSection === 'favorites' && <FavoritesSection />}
        {activeSection === 'documentation' && <DocumentationSection />}
      </main>
    </div>
  )
}
