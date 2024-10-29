import { create } from "zustand";

interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  salary: number;
  performance: "New" | "Low" | "Medium" | "High";
  experience: number;
  satisfaction: number;
  productivity: number;
  hiredAt: Date;
  lastPromoted: Date;
  trainingCompleted: Array<{
    name: string;
    completedAt: Date;
  }>;
  status: "Active" | "OnLeave" | "Training" | "Terminated";
}

interface StaffPosition {
  _id: string;
  name: string;
  role: string;
  department: string;
  salary: number;
  baseSalary: number;
  performance: "New" | "Low" | "Medium" | "High";
  experience: number;
  satisfaction: number;
  productivity: number;
  hiredAt: Date;
  lastPromoted: Date;
  trainingCompleted: Array<{
    name: string;
    completedAt: Date;
  }>;
  status: "Active" | "OnLeave" | "Training" | "Terminated";
  requirements: string;
  description: string;
  requiredExperience: number;
}

interface EmployeeStore {
  employees: Employee[];
  isLoading: boolean;
  error: string | null;
  fetchEmployees: () => Promise<void>;
  addEmployee: (employee: Omit<Employee, "id">) => Promise<void>;
  removeEmployee: (id: string) => Promise<void>;
  updateEmployee: (id: string, employee: Partial<Employee>) => Promise<void>;
  staffPositions: StaffPosition[];
  fetchStaffPositions: () => Promise<void>;
}

export const useStore = create<EmployeeStore>((set) => ({
  employees: [],
  isLoading: false,
  error: null,
  staffPositions: [],

  fetchEmployees: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch("/api/employees");
      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }
      const data = await response.json();
      const formattedData = data.map((emp: any) => ({
        ...emp,
        id: emp._id,
      }));
      set({ employees: formattedData, isLoading: false });
    } catch (error) {
      console.error("Error fetching employees:", error);
      set({ error: "Failed to fetch employees", isLoading: false });
    }
  },

  addEmployee: async (employee) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
      });

      if (!response.ok) {
        throw new Error("Failed to add employee");
      }

      const newEmployee = await response.json();
      const formattedEmployee = {
        ...newEmployee,
        id: newEmployee._id,
      };

      set((state) => ({
        employees: [...state.employees, formattedEmployee],
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error adding employee:", error);
      set({ error: "Failed to add employee", isLoading: false });
    }
  },

  removeEmployee: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/employees?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to remove employee");
      }

      set((state) => ({
        employees: state.employees.filter((emp) => emp.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error removing employee:", error);
      set({ error: "Failed to remove employee", isLoading: false });
    }
  },

  updateEmployee: async (id, updatedEmployee) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/employees`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updatedEmployee }),
      });

      if (!response.ok) {
        throw new Error("Failed to update employee");
      }

      const updated = await response.json();
      const formattedEmployee = {
        ...updated,
        id: updated._id,
      };

      set((state) => ({
        employees: state.employees.map((emp) =>
          emp.id === id ? formattedEmployee : emp
        ),
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error updating employee:", error);
      set({ error: "Failed to update employee", isLoading: false });
    }
  },

  fetchStaffPositions: async () => {
    try {
      const response = await fetch("/api/staff-positions");
      if (!response.ok) {
        throw new Error("Failed to fetch staff positions");
      }
      const data = await response.json();
      set({ staffPositions: data });
    } catch (error) {
      console.error("Error fetching staff positions:", error);
    }
  },
}));
