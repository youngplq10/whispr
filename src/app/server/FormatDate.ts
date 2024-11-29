export function formatDate (dateString: string): string {
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString('pl-PL', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
    const formattedTime = date.toLocaleTimeString('pl-PL', {
        hour: '2-digit',
        minute: '2-digit',
    });
    return `${formattedDate} ${formattedTime}`;
};

export function formatDateWithoutHours (dateString: string): string {
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString('pl-PL', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
    const formattedTime = date.toLocaleTimeString('pl-PL', {
        hour: '2-digit',
        minute: '2-digit',
    });
    return `${formattedDate}`;
};
