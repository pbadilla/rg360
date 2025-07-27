import subprocess
import time
import webbrowser
import socket
import os
import signal
from threading import Thread
from datetime import datetime
from colorama import Fore, Style, init

init(autoreset=True)

# Config: (name, port, pnpm filter)
services = [
    ("front", 3001, "rollergrind360-ecommerce-frontend")
]

# Color map for each service
colors = [Fore.BLUE, Fore.GREEN, Fore.YELLOW]
color_map = {name: colors[i % len(colors)] for i, (name, _, _) in enumerate(services)}

# Start services
processes = {}

def stream_output(name, proc):
    color = color_map[name]
    for line in iter(proc.stdout.readline, b''):
        timestamp = datetime.now().strftime("%H:%M:%S")
        print(f"{color}[{timestamp}] [{name.upper()}] {line.decode().rstrip()}{Style.RESET_ALL}")

for name, _, filter_name in services:
    print(f"{Fore.CYAN}🚀 Starting {name}...{Style.RESET_ALL}")
    proc = subprocess.Popen(
        ["pnpm", "--filter", filter_name, "run", "dev"],
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        preexec_fn=os.setsid
    )
    processes[name] = proc
    Thread(target=stream_output, args=(name, proc), daemon=True).start()

# Wait for port to be ready
def wait_for_port(port, timeout=60):
    start = time.time()
    while time.time() - start < timeout:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            sock.settimeout(1)
            if sock.connect_ex(('localhost', port)) == 0:
                return True
        time.sleep(0.5)
    return False

# Wait for all
for name, port, _ in services:
    print(f"{Fore.MAGENTA}⏳ Waiting for {name} on port {port}...{Style.RESET_ALL}")
    if wait_for_port(port):
        print(f"{Fore.GREEN}✅ {name} ready at http://localhost:{port}{Style.RESET_ALL}")
    else:
        print(f"{Fore.RED}⚠️ Timeout waiting for {name} on port {port}{Style.RESET_ALL}")

# Open URLs
for _, port, _ in services:
    webbrowser.open_new_tab(f"http://localhost:{port}")

print(f"{Fore.CYAN}🌐 All services running. Browsers opened. Press Ctrl+C to exit.{Style.RESET_ALL}")

# Keep alive until Ctrl+C
try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print(f"\n{Fore.RED}🛑 Shutting down...{Style.RESET_ALL}")
    for name, proc in processes.items():
        os.killpg(os.getpgid(proc.pid), signal.SIGTERM)
    print(f"{Fore.GREEN}✅ All processes terminated.{Style.RESET_ALL}")
