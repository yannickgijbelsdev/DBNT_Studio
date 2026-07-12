#!/usr/bin/env python3
"""
Backend API Testing for DBNT News Proxy Endpoints
Tests the news proxy endpoints with recent changes:
- HTTPS upstream (https://clr.koodh.com)
- User-Agent header
- 15s timeouts
- NEW /api/news/health diagnostic endpoint
"""

import requests
import sys
import json
from pathlib import Path

# Load REACT_APP_BACKEND_URL from frontend/.env
def load_backend_url():
    env_file = Path("/app/frontend/.env")
    if not env_file.exists():
        print("❌ ERROR: /app/frontend/.env not found")
        sys.exit(1)
    
    with open(env_file) as f:
        for line in f:
            if line.startswith("REACT_APP_BACKEND_URL="):
                url = line.split("=", 1)[1].strip()
                return f"{url}/api"
    
    print("❌ ERROR: REACT_APP_BACKEND_URL not found in .env")
    sys.exit(1)

BASE_URL = load_backend_url()
print(f"🔗 Testing against: {BASE_URL}\n")

# Test results tracking
test_results = {
    "passed": 0,
    "failed": 0,
    "tests": []
}

def log_test(name, passed, details=""):
    """Log test result"""
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"{status}: {name}")
    if details:
        print(f"   {details}")
    
    test_results["tests"].append({
        "name": name,
        "passed": passed,
        "details": details
    })
    
    if passed:
        test_results["passed"] += 1
    else:
        test_results["failed"] += 1

def test_news_homepagina():
    """Test 1: GET /api/news/homepagina"""
    print("\n" + "="*70)
    print("TEST 1: GET /api/news/homepagina")
    print("="*70)
    
    try:
        response = requests.get(f"{BASE_URL}/news/homepagina", timeout=20)
        
        # Check status code
        if response.status_code != 200:
            log_test(
                "GET /api/news/homepagina - HTTP 200",
                False,
                f"Expected 200, got {response.status_code}"
            )
            return None
        
        log_test("GET /api/news/homepagina - HTTP 200", True)
        
        # Check JSON response
        try:
            data = response.json()
        except json.JSONDecodeError as e:
            log_test(
                "GET /api/news/homepagina - Valid JSON",
                False,
                f"Invalid JSON: {e}"
            )
            return None
        
        log_test("GET /api/news/homepagina - Valid JSON", True)
        
        # Check for 'items' array
        if "items" not in data:
            log_test(
                "GET /api/news/homepagina - Contains 'items' key",
                False,
                f"Response keys: {list(data.keys())}"
            )
            return None
        
        log_test("GET /api/news/homepagina - Contains 'items' key", True)
        
        # Check items is an array
        if not isinstance(data["items"], list):
            log_test(
                "GET /api/news/homepagina - 'items' is array",
                False,
                f"'items' type: {type(data['items'])}"
            )
            return None
        
        log_test("GET /api/news/homepagina - 'items' is array", True)
        
        # Check at least 1 item
        if len(data["items"]) < 1:
            log_test(
                "GET /api/news/homepagina - At least 1 item",
                False,
                f"Found {len(data['items'])} items"
            )
            return None
        
        log_test(
            "GET /api/news/homepagina - At least 1 item",
            True,
            f"Found {len(data['items'])} items"
        )
        
        # Get first item's ID
        first_item = data["items"][0]
        if "id" not in first_item:
            log_test(
                "GET /api/news/homepagina - First item has 'id'",
                False,
                f"First item keys: {list(first_item.keys())}"
            )
            return None
        
        article_id = first_item["id"]
        article_title = first_item.get("title", "Unknown")
        
        log_test(
            "GET /api/news/homepagina - First item has 'id'",
            True,
            f"ID: {article_id}, Title: {article_title}"
        )
        
        print(f"\n📋 Response summary:")
        print(f"   - Total items: {len(data['items'])}")
        print(f"   - First item ID: {article_id}")
        print(f"   - First item title: {article_title}")
        
        return article_id
        
    except requests.RequestException as e:
        log_test(
            "GET /api/news/homepagina - Request successful",
            False,
            f"Request error: {e}"
        )
        return None

def test_news_health():
    """Test 2: GET /api/news/health (NEW diagnostic endpoint)"""
    print("\n" + "="*70)
    print("TEST 2: GET /api/news/health (NEW DIAGNOSTIC ENDPOINT)")
    print("="*70)
    
    try:
        response = requests.get(f"{BASE_URL}/news/health", timeout=20)
        
        # Check status code
        if response.status_code != 200:
            log_test(
                "GET /api/news/health - HTTP 200",
                False,
                f"Expected 200, got {response.status_code}"
            )
            return False
        
        log_test("GET /api/news/health - HTTP 200", True)
        
        # Check JSON response
        try:
            data = response.json()
        except json.JSONDecodeError as e:
            log_test(
                "GET /api/news/health - Valid JSON",
                False,
                f"Invalid JSON: {e}"
            )
            return False
        
        log_test("GET /api/news/health - Valid JSON", True)
        
        # Check required keys
        required_keys = ["reachable", "status_code", "elapsed_ms", "items", "upstream"]
        missing_keys = [key for key in required_keys if key not in data]
        
        if missing_keys:
            log_test(
                "GET /api/news/health - Contains all required keys",
                False,
                f"Missing keys: {missing_keys}. Found keys: {list(data.keys())}"
            )
            return False
        
        log_test(
            "GET /api/news/health - Contains all required keys",
            True,
            f"Keys: {list(data.keys())}"
        )
        
        # Check 'reachable' is true
        if data["reachable"] != True:
            log_test(
                "GET /api/news/health - 'reachable' is true",
                False,
                f"reachable: {data['reachable']}"
            )
        else:
            log_test("GET /api/news/health - 'reachable' is true", True)
        
        # Check 'status_code' is 200
        if data["status_code"] != 200:
            log_test(
                "GET /api/news/health - 'status_code' is 200",
                False,
                f"status_code: {data['status_code']}"
            )
        else:
            log_test("GET /api/news/health - 'status_code' is 200", True)
        
        # Check 'elapsed_ms' is a number
        if not isinstance(data["elapsed_ms"], (int, float)):
            log_test(
                "GET /api/news/health - 'elapsed_ms' is a number",
                False,
                f"elapsed_ms type: {type(data['elapsed_ms'])}"
            )
        else:
            log_test(
                "GET /api/news/health - 'elapsed_ms' is a number",
                True,
                f"elapsed_ms: {data['elapsed_ms']}ms"
            )
        
        # Check 'items' is a number >= 1
        if not isinstance(data["items"], (int, type(None))):
            log_test(
                "GET /api/news/health - 'items' is a number",
                False,
                f"items type: {type(data['items'])}"
            )
        elif data["items"] is not None and data["items"] < 1:
            log_test(
                "GET /api/news/health - 'items' >= 1",
                False,
                f"items: {data['items']}"
            )
        else:
            log_test(
                "GET /api/news/health - 'items' >= 1",
                True,
                f"items: {data['items']}"
            )
        
        # Check 'upstream' shows HTTPS URL
        if not isinstance(data["upstream"], str) or not data["upstream"].startswith("https://"):
            log_test(
                "GET /api/news/health - 'upstream' is HTTPS URL",
                False,
                f"upstream: {data['upstream']}"
            )
        else:
            log_test(
                "GET /api/news/health - 'upstream' is HTTPS URL",
                True,
                f"upstream: {data['upstream']}"
            )
        
        # Confirm it does NOT throw 500
        log_test(
            "GET /api/news/health - Does NOT return 500",
            True,
            f"Returned {response.status_code}"
        )
        
        print(f"\n📋 Health check summary:")
        print(f"   - Reachable: {data.get('reachable')}")
        print(f"   - Status code: {data.get('status_code')}")
        print(f"   - Elapsed: {data.get('elapsed_ms')}ms")
        print(f"   - Items: {data.get('items')}")
        print(f"   - Upstream: {data.get('upstream')}")
        
        return True
        
    except requests.RequestException as e:
        log_test(
            "GET /api/news/health - Request successful",
            False,
            f"Request error: {e}"
        )
        return False

def test_news_article(article_id):
    """Test 3: GET /api/news/articles/{id}"""
    print("\n" + "="*70)
    print(f"TEST 3: GET /api/news/articles/{article_id}")
    print("="*70)
    
    if not article_id:
        log_test(
            "GET /api/news/articles/{id} - Skipped",
            False,
            "No article ID from Test 1"
        )
        return False
    
    try:
        response = requests.get(f"{BASE_URL}/news/articles/{article_id}", timeout=20)
        
        # Check status code
        if response.status_code != 200:
            log_test(
                f"GET /api/news/articles/{article_id} - HTTP 200",
                False,
                f"Expected 200, got {response.status_code}"
            )
            return False
        
        log_test(f"GET /api/news/articles/{article_id} - HTTP 200", True)
        
        # Check JSON response
        try:
            data = response.json()
        except json.JSONDecodeError as e:
            log_test(
                f"GET /api/news/articles/{article_id} - Valid JSON",
                False,
                f"Invalid JSON: {e}"
            )
            return False
        
        log_test(f"GET /api/news/articles/{article_id} - Valid JSON", True)
        
        # Check for 'title' field
        if "title" not in data:
            log_test(
                f"GET /api/news/articles/{article_id} - Contains 'title'",
                False,
                f"Response keys: {list(data.keys())}"
            )
            return False
        
        log_test(
            f"GET /api/news/articles/{article_id} - Contains 'title'",
            True,
            f"Title: {data['title']}"
        )
        
        # Check for 'body' field
        if "body" not in data:
            log_test(
                f"GET /api/news/articles/{article_id} - Contains 'body'",
                False,
                f"Response keys: {list(data.keys())}"
            )
            return False
        
        body_length = len(str(data['body']))
        log_test(
            f"GET /api/news/articles/{article_id} - Contains 'body'",
            True,
            f"Body length: {body_length} chars"
        )
        
        print(f"\n📋 Article summary:")
        print(f"   - Title: {data.get('title')}")
        print(f"   - Body length: {body_length} chars")
        print(f"   - Response keys: {list(data.keys())}")
        
        return True
        
    except requests.RequestException as e:
        log_test(
            f"GET /api/news/articles/{article_id} - Request successful",
            False,
            f"Request error: {e}"
        )
        return False

def check_backend_logs():
    """Test 4: Check backend logs for errors"""
    print("\n" + "="*70)
    print("TEST 4: Check backend logs for errors")
    print("="*70)
    
    import subprocess
    
    try:
        # Get last 100 lines of backend logs
        result = subprocess.run(
            ["tail", "-n", "100", "/var/log/supervisor/backend.err.log"],
            capture_output=True,
            text=True,
            timeout=5
        )
        
        error_log = result.stdout
        
        # Check for critical errors related to news endpoints
        error_keywords = [
            "Traceback",
            "Exception",
            "ERROR",
            "CRITICAL",
            "NameError",
            "AttributeError",
            "KeyError"
        ]
        
        errors_found = []
        for line in error_log.split("\n"):
            if any(keyword in line for keyword in error_keywords):
                # Filter out old errors (only check recent ones)
                if "news" in line.lower() or "article" in line.lower():
                    errors_found.append(line.strip())
        
        if errors_found:
            log_test(
                "Backend logs - No errors for news endpoints",
                False,
                f"Found {len(errors_found)} error lines"
            )
            print("\n⚠️  Error lines found:")
            for error in errors_found[:5]:  # Show first 5
                print(f"   {error}")
        else:
            log_test(
                "Backend logs - No errors for news endpoints",
                True,
                "No critical errors found in recent logs"
            )
        
        return len(errors_found) == 0
        
    except Exception as e:
        log_test(
            "Backend logs - Check logs",
            False,
            f"Could not read logs: {e}"
        )
        return False

def print_summary():
    """Print final test summary"""
    print("\n" + "="*70)
    print("FINAL TEST SUMMARY")
    print("="*70)
    
    total = test_results["passed"] + test_results["failed"]
    print(f"\n📊 Results: {test_results['passed']}/{total} tests passed")
    
    if test_results["failed"] > 0:
        print(f"\n❌ Failed tests ({test_results['failed']}):")
        for test in test_results["tests"]:
            if not test["passed"]:
                print(f"   - {test['name']}")
                if test["details"]:
                    print(f"     {test['details']}")
    
    print("\n" + "="*70)
    
    if test_results["failed"] == 0:
        print("✅ ALL TESTS PASSED")
        return 0
    else:
        print("❌ SOME TESTS FAILED")
        return 1

if __name__ == "__main__":
    print("🧪 DBNT News Proxy Endpoints Testing")
    print("="*70)
    
    # Run tests
    article_id = test_news_homepagina()
    test_news_health()
    test_news_article(article_id)
    check_backend_logs()
    
    # Print summary and exit
    exit_code = print_summary()
    sys.exit(exit_code)
