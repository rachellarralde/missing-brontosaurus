export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full bg-background/80 backdrop-blur-sm border-t border-muted">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-center items-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Missing Brontosaurus. All rights reserved.
        </p>
      </div>
    </footer>
  )
} 