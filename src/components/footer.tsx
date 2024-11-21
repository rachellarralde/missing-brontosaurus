export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full bg-background/80 backdrop-blur-sm border-t border-muted">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-center items-center gap-4">
        <span className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Missing Brontosaurus.
        </span>
        <span>A Label by NAIAD</span>
        <span className="text-sm text-muted-foreground">Website by RVCHL &amp; sigill</span>
      </div>
    </footer >
  )
} 
