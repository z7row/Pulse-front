"use client";

import { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Camera, Loader2, Save, UserX, ArrowLeft, Home } from "lucide-react";
import Cookies from "js-cookie";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BannerUpload } from "@/components/blog/editor/BannerUpload";

export type profile = {
    _id: string;
    name: string;
    pio: string;
    email: string;
    profilephoto: string;
    banner: string;
    data: any;
    goal: string;
};

export default function EditProfilePage() {
    const router = useRouter();

    const [user, setUser] = useState<profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    // Form states
    const [name, setName] = useState("");
    const [pio, setPio] = useState("");
    const [goal, setGoal] = useState("");

    // Files and Previews (Pending submission)
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    // Saving State
    const [savingProfile, setSavingProfile] = useState(false);
    const accessToken = Cookies.get("access_token");

    // Fetch current user data
    useEffect(() => {
        if (!accessToken) {
            setUser(null);
            setLoading(false);
            router.push("/auth/login");
            return;
        }

        async function fetchMe() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/me`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });


                if (!res.ok) throw new Error("Failed to fetch user");

                const apidata: profile = await res.json();
                const data = apidata.data
                setUser(data);
                setName(data.name || "");
                setPio(data.pio || "");
                setGoal(data.goal || "");
            } catch (err) {
                console.error(err);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        }

        fetchMe();
    }, [accessToken, router]);

    // Handle Local Image Pickers (Preview only)
    const handleBannerChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setBannerFile(file);
        setBannerPreview(URL.createObjectURL(file));
    };

    const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setPhotoFile(file);
        setPhotoPreview(URL.createObjectURL(file));
    };

    // Save All Changes On Submit
    const handleSaveInfo = async (e: React.FormEvent) => {
        e.preventDefault();
        setSavingProfile(true);

        try {
            // 1. Upload Banner Image if changed
            if (bannerFile) {
                const formData = new FormData();
                formData.append("files", bannerFile);
                const resBanner = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/me/banner`, {
                    method: "POST",
                    headers: { Authorization: `Bearer ${accessToken}` },
                    body: formData,
                });
                if (!resBanner.ok) throw new Error("Failed to upload banner");
            }

            // 2. Upload Profile Photo if changed
            if (photoFile) {
                const formData = new FormData();
                formData.append("files", photoFile);
                const resPhoto = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/me/photo`, {
                    method: "POST",
                    headers: { Authorization: `Bearer ${accessToken}` },
                    body: formData,
                });
                if (!resPhoto.ok) throw new Error("Failed to upload profile photo");
            }

            // 3. Save Text Info (Name, Bio, Goal)
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/me/edit`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ name, pio, goal }),
            });

            if (!res.ok) throw new Error("Failed to update profile info");

            router.push("/profile/me");
            router.refresh();
        } catch (err) {
            console.error(err);
            alert("Error saving profile details");
        } finally {
            setSavingProfile(false);
        }
    };

    // 1. Loading State
    if (loading) {
        return (
            <div className="flex min-h-screen w-full items-center justify-center">
                <Loader2 className="size-8 animate-spin text-primary" />
            </div>
        );
    }

    // 2. 404 / Not Found State
   if (notFound || !user) {
        return (
            <div className="flex min-h-screen w-full flex-col items-center justify-center rounded-3xl border border-dashed border-border/60 bg-muted/30 p-8 text-center">
                <div className="mb-4 rounded-full p-4 text-destructive">
                    <UserX className="size-12" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">Internal Server Error</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                    Something went wrong on our end while fetching the user data. Please try again later.
                </p>
                <Button asChild className="mt-6 gap-2 rounded-full px-6">
                    <Link href="/">
                        <Home className="size-4" />
                        Back to Home
                    </Link>
                </Button>
            </div>
        );
    }

    // 3. Main Edit Page
    return (
        <div className="w-full flex flex-col justify-center px-6 sm:px-16 lg:px-26 py-12 sm:py-24">
            {/* Header Back Button */}
            <div className="mb-6 flex items-center gap-4 cursor-pointer w-fit" onClick={() => router.back()}>
                <ArrowLeft className="size-5" />
                <h1 className="text-2xl font-bold tracking-tight">Edit Profile</h1>
            </div>

            <section className="relative mb-10">
                {/* Cover / Banner Section */}
                <div className="relative h-56 overflow-hidden rounded-4xl border border-border/50 bg-muted sm:h-72">
                    {bannerPreview || user.banner ? (
                        <>
                            <Image
                                src={bannerPreview || user.banner}
                                alt="Cover"
                                width={1600}
                                height={600}
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/20" />
                        </>
                    ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
                            <Camera className="size-8" />
                            <span className="text-sm font-medium">No cover image uploaded</span>
                        </div>
                    )}

                    {/* استبدل السطر القديم بالسطر ده */}
                    <BannerUpload
                        bannerPreview={bannerPreview}
                        currentBanner={user.banner}
                        onChange={handleBannerChange}
                    />
                </div>

                {/* Profile Photo Section */}
                <div className="relative -mt-16 px-5 sm:px-10">
                    <div className="relative size-32 overflow-hidden rounded-full border-4 border-background bg-background sm:size-36">
                        <Image
                            src={photoPreview || user.profilephoto || "/photos/logo/logo-bg-up.jpg"}
                            alt="Avatar"
                            width={150}
                            height={150}
                            className="h-full w-full object-cover"
                        />
                        {/* Photo Upload Overlay */}
                        <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 opacity-0 transition hover:opacity-100">
                            <Camera className="size-6 text-white" />
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handlePhotoChange}
                            />
                        </label>
                    </div>
                </div>
            </section>

            {/* Profile Details Form */}
            <form onSubmit={handleSaveInfo} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="goal">Goal / Title</Label>
                    <Input
                        id="goal"
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        placeholder="e.g. Developer, Designer..."
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="pio">Bio</Label>
                    <Textarea
                        id="pio"
                        value={pio}
                        onChange={(e) => setPio(e.target.value)}
                        placeholder="Tell us about yourself..."
                        rows={4}
                    />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.back()}
                        disabled={savingProfile}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={savingProfile} className="gap-2">
                        {savingProfile ? (
                            <Loader2 className="size-4 animate-spin" />
                        ) : (
                            <Save className="size-4" />
                        )}
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    );
}