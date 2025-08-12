export default function CalendarPage() {
  return (
    <div style={{
      backgroundColor: 'black',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <button style={{
        padding: '1rem 2rem',
        fontSize: '1.25rem',
        backgroundColor: '#fff',
        color: '#000',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer'
      }}>
        Calendar Button
      </button>
    </div>
  );
}
