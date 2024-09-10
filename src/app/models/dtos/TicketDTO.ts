export interface TicketDTO {
    ticketId: number;
    title: string;
    description: string;
    status: 'OPEN' | 'CLOSED' | 'IN_PROGRESS'; 
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    ticketCategoryName: string;
    assignedTo: string | null;
    assignedGroup: string | null;
    createdAt: string; 
    updatedAt: string; 
    resolvedAt: string | null; 
    createdBy: string | null;
}
