
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface AdminLoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: () => void;
}

const AdminLoginModal = ({ isOpen, onClose, onLogin }: AdminLoginModalProps) => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleLogin = () => {
        // Simple client-side check. 
        // In a real app, this should verify against an API, but this stops casual users.
        if (password === "admin") {
            onLogin();
            setPassword("");
            setError(false);
        } else {
            setError(true);
            setPassword("");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Lock className="w-5 h-5 text-blue-600" />
                        Admin Access Required
                    </DialogTitle>
                    <DialogDescription>
                        Enter the administrator password to edit site data.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError(false);
                            }}
                            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                            className={error ? "border-red-500 focus-visible:ring-red-500" : ""}
                        />
                        {error && <p className="text-sm text-red-500 font-medium">Incorrect password</p>}
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleLogin}>Unlock Access</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AdminLoginModal;
