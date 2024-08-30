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
}

// Example usage
const exampleTicket: TicketDTO = {
    ticketId: 3,
    title: "3 ticket",
    description: "this is the 3 ticket in the new db",
    status: "OPEN",
    priority: "LOW",
    ticketCategoryName: "Hardware Issues",
    assignedTo: null,
    assignedGroup: null,
    createdAt: "2024-08-28T10:16:36.431916",
    updatedAt: "2024-08-28T10:16:36.431916",
    resolvedAt: null
};