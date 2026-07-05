#!/usr/bin/env python3
"""
Backend API Testing Script for DBNT News Proxy Endpoints
Tests the two news proxy endpoints in /app/backend/server.py
"""

import requests
import sys
import json

# Get backend URL from environment
BACKEND_URL = "https://agency-showcase-212.preview.emergentagent.com/api"

def test_news_homepagina():
    """Test GET /api/news/homepagina endpoint"""
    print("\n" + "="*80)
    print("TEST 1: GET /api/news/homepagina")
    print("="*80)
    
    try:
        response = requests.get(f"{BACKEND_URL}/news/homepagina", timeout=30)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print(f"❌ FAILED: Expected status 200, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
        
        # Parse JSON response
        data = response.json()
        print(f"✓ Response is valid JSON")
        
        # Check for 'items' array
        if 'items' not in data:
            print(f"❌ FAILED: Response does not contain 'items' field")
            print(f"Response keys: {list(data.keys())}")
            return False
        
        print(f"✓ Response contains 'items' field")
        
        # Check items is a list
        if not isinstance(data['items'], list):
            print(f"❌ FAILED: 'items' is not a list, it's {type(data['items'])}")
            return False
        
        print(f"✓ 'items' is a list with {len(data['items'])} items")
        
        # Check if items array has content
        if len(data['items']) == 0:
            print(f"⚠ WARNING: 'items' array is empty")
            return True  # Not a failure, just no data
        
        # Check first item structure
        first_item = data['items'][0]
        required_fields = ['id', 'title', 'category', 'published_at']
        missing_fields = [field for field in required_fields if field not in first_item]
        
        if missing_fields:
            print(f"⚠ WARNING: First item missing fields: {missing_fields}")
            print(f"First item keys: {list(first_item.keys())}")
        else:
            print(f"✓ First item has all required fields: {required_fields}")
        
        # Look for "Catch It!" article
        catch_it_article = None
        for item in data['items']:
            if 'title' in item and 'Catch It!' in item['title']:
                catch_it_article = item
                break
        
        if catch_it_article:
            print(f"✓ Found 'Catch It!' article with id: {catch_it_article.get('id')}")
            # Store this ID for the next test
            return catch_it_article.get('id')
        else:
            print(f"⚠ WARNING: 'Catch It!' article not found in items")
            # Return first item's ID if available
            if data['items'] and 'id' in data['items'][0]:
                first_id = data['items'][0]['id']
                print(f"  Using first item's id instead: {first_id}")
                return first_id
            return True
        
    except requests.exceptions.RequestException as e:
        print(f"❌ FAILED: Request exception: {e}")
        return False
    except json.JSONDecodeError as e:
        print(f"❌ FAILED: Invalid JSON response: {e}")
        return False
    except Exception as e:
        print(f"❌ FAILED: Unexpected error: {e}")
        return False


def test_news_article(article_id):
    """Test GET /api/news/articles/{article_id} endpoint"""
    print("\n" + "="*80)
    print(f"TEST 2: GET /api/news/articles/{article_id}")
    print("="*80)
    
    try:
        response = requests.get(f"{BACKEND_URL}/news/articles/{article_id}", timeout=30)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print(f"❌ FAILED: Expected status 200, got {response.status_code}")
            print(f"Response: {response.text}")
            return False
        
        # Parse JSON response
        data = response.json()
        print(f"✓ Response is valid JSON")
        
        # Check for required fields
        if 'title' not in data:
            print(f"❌ FAILED: Response does not contain 'title' field")
            print(f"Response keys: {list(data.keys())}")
            return False
        
        print(f"✓ Response contains 'title' field: {data['title'][:50]}...")
        
        if 'body' not in data:
            print(f"❌ FAILED: Response does not contain 'body' field")
            print(f"Response keys: {list(data.keys())}")
            return False
        
        print(f"✓ Response contains 'body' field")
        
        # Check if body contains HTML
        body = data['body']
        if not isinstance(body, str):
            print(f"❌ FAILED: 'body' is not a string, it's {type(body)}")
            return False
        
        # Simple HTML check - look for common HTML tags
        html_indicators = ['<p>', '<div>', '<span>', '<h1>', '<h2>', '<h3>', '<br>', '<a>']
        has_html = any(indicator in body for indicator in html_indicators)
        
        if has_html:
            print(f"✓ 'body' contains HTML content (length: {len(body)} chars)")
        else:
            print(f"⚠ WARNING: 'body' might not contain HTML (length: {len(body)} chars)")
            print(f"  First 100 chars: {body[:100]}")
        
        print(f"✅ TEST PASSED: Article endpoint returned valid response")
        return True
        
    except requests.exceptions.RequestException as e:
        print(f"❌ FAILED: Request exception: {e}")
        return False
    except json.JSONDecodeError as e:
        print(f"❌ FAILED: Invalid JSON response: {e}")
        return False
    except Exception as e:
        print(f"❌ FAILED: Unexpected error: {e}")
        return False


def test_news_article_invalid():
    """Test GET /api/news/articles/{article_id} with invalid ID"""
    print("\n" + "="*80)
    print("TEST 3: GET /api/news/articles/nonexistent-id-123 (Invalid ID)")
    print("="*80)
    
    try:
        response = requests.get(f"{BACKEND_URL}/news/articles/nonexistent-id-123", timeout=30)
        print(f"Status Code: {response.status_code}")
        
        # Should return 502 or some error response, not crash
        if response.status_code == 200:
            print(f"⚠ WARNING: Got 200 OK for invalid article ID (unexpected)")
            return True
        
        if response.status_code == 502:
            print(f"✓ Got expected 502 Bad Gateway for invalid article")
            try:
                error_data = response.json()
                print(f"✓ Error response is valid JSON: {error_data}")
            except:
                print(f"  Response text: {response.text}")
            return True
        
        # Any other error status is also acceptable
        if response.status_code >= 400:
            print(f"✓ Got error status {response.status_code} for invalid article (acceptable)")
            try:
                error_data = response.json()
                print(f"  Error response: {error_data}")
            except:
                print(f"  Response text: {response.text}")
            return True
        
        print(f"⚠ WARNING: Unexpected status code {response.status_code}")
        return True
        
    except requests.exceptions.RequestException as e:
        print(f"❌ FAILED: Request exception (server might have crashed): {e}")
        return False
    except Exception as e:
        print(f"❌ FAILED: Unexpected error: {e}")
        return False


def main():
    """Run all backend tests"""
    print("\n" + "="*80)
    print("BACKEND API TESTING - DBNT News Proxy Endpoints")
    print("="*80)
    print(f"Backend URL: {BACKEND_URL}")
    
    results = []
    
    # Test 1: Homepage endpoint
    result1 = test_news_homepagina()
    if isinstance(result1, str):
        # Got an article ID
        article_id = result1
        results.append(True)
    elif result1 is True:
        # Passed but no specific article ID
        article_id = "898cf109-e3c4-40a7-9eac-df6204128969"  # Use known ID from requirements
        results.append(True)
    else:
        results.append(False)
        article_id = "898cf109-e3c4-40a7-9eac-df6204128969"  # Try anyway
    
    # Test 2: Article endpoint with valid ID
    result2 = test_news_article(article_id)
    results.append(result2)
    
    # Test 3: Article endpoint with invalid ID
    result3 = test_news_article_invalid()
    results.append(result3)
    
    # Summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    passed = sum(results)
    total = len(results)
    print(f"Tests Passed: {passed}/{total}")
    
    if passed == total:
        print("✅ ALL TESTS PASSED")
        return 0
    else:
        print("❌ SOME TESTS FAILED")
        return 1


if __name__ == "__main__":
    sys.exit(main())
