
import subprocess

def get_zfs_space(dataset="tank"):
    try:
        result = subprocess.run(
            ["zfs", "list", "-Hp", "-o", "used,avail", dataset],
            capture_output=True,
            text=True,
            check=True,
        )
    except (FileNotFoundError, subprocess.CalledProcessError):
        return {
            "used": None,
            "free": None,
            "total": None,
        }

    used, available = map(int, result.stdout.split())

    return {
        "used": used,
        "free": available,
        "total": used + available,
    }
