export interface CreateTicketDTO {
    title: string;
    description: string;
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    ticketCategory: number;
    
}
