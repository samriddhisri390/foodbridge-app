// Shared React Components for FoodBridge
const { useState, useEffect, useRef, useMemo, useCallback } = React;

// 1. Error Boundary
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Outfit, sans-serif' }}>
                    <div style={{ 
                        background: '#fee2e2', color: '#ef4444', 
                        padding: '20px', borderRadius: '16px', display: 'inline-block' 
                    }}>
                        <h2 style={{ margin: '0 0 10px 0' }}>Oops! Something went wrong.</h2>
                        <p style={{ margin: '0 0 20px 0' }}>We encountered an unexpected error.</p>
                        <button 
                            onClick={() => window.location.reload()}
                            style={{
                                background: '#ef4444', color: 'white', border: 'none', 
                                padding: '10px 20px', borderRadius: '8px', cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

window.ErrorBoundary = ErrorBoundary;

// 2. Optimized Lucide Icon (React.memo to prevent unnecessary re-renders)
const Icon = React.memo(({ name, size = 24, color, className = "" }) => {
    const iconRef = useRef(null);
    
    useEffect(() => {
        if (iconRef.current) {
            iconRef.current.innerHTML = "";
            const i = document.createElement("i");
            i.setAttribute("data-lucide", name);
            if (color) i.style.color = color;
            if (size) { 
                i.style.width = size + "px"; 
                i.style.height = size + "px"; 
            }
            if (className) i.className = className;
            iconRef.current.appendChild(i);
            
            // Recreate icons for this specific element
            lucide.createIcons({ root: iconRef.current });
        }
    }, [name, color, size, className]); // Only re-run if these props change
    
    return <span ref={iconRef} className={`icon-wrapper ${className}`} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }} />;
});

window.Icon = Icon;

// 3. Skeleton Loading Components
const SkeletonCard = () => (
    <div className="skeleton-card" style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '24px',
        padding: '24px',
        marginBottom: '16px',
        display: 'flex',
        gap: '16px',
        alignItems: 'center'
    }}>
        <div className="skeleton-avatar" style={{ width: '48px', height: '48px', borderRadius: '12px', flexShrink: 0 }}></div>
        <div style={{ flex: 1 }}>
            <div className="skeleton-line" style={{ width: '60%' }}></div>
            <div className="skeleton-line short" style={{ width: '40%' }}></div>
        </div>
    </div>
);

window.SkeletonCard = SkeletonCard;
